"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { centreModel, createLoader, createStage } from "@/lib/three-stage";
import styles from "./ModelViewer.module.css";

type Props = {
  modelUrl: string;
  label: string;
  // Full-page mode: one-finger rotate on touch screens and plain wheel zoom,
  // since there's no page behind it to scroll.
  expanded?: boolean;
};

const ZOOM_STEP = 0.8; // each +/− click moves the camera 20% closer or further

// Interactive model: drag to rotate, +/− (or Ctrl/⌘ + scroll, or scroll
// after clicking in, or pinch) to zoom, slow auto-spin when idle.
export default function ModelViewer({ modelUrl, label, expanded = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const expandedRef = useRef(expanded);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stage = createStage(container);
    const { renderer, scene, camera } = stage;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    controlsRef.current = controls;

    let radius = 0.4;
    let disposed = false;
    let mixer: THREE.AnimationMixer | null = null;
    const timer = new THREE.Timer();

    createLoader().load(modelUrl, (gltf) => {
      if (disposed) return;
      radius = centreModel(gltf.scene);
      scene.add(gltf.scene);
      // Play any animations baked into the file (e.g. dynein walking).
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => mixer!.clipAction(clip).play());
      }
      resize();
      setLoaded(true);
    });

    function resize() {
      if (!container) return;
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Fit the bounding sphere to the smaller side of the box.
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const fit = radius / Math.sin(vFov / 2) / Math.min(camera.aspect, 1);
      camera.position.setLength(fit * 0.9);
      controls.minDistance = fit * 0.3;
      controls.maxDistance = fit * 1.8;
      camera.updateProjectionMatrix();
    }

    camera.position.set(0, 0, 3);
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Plain scrolling over the box scrolls the page. The wheel only zooms
    // with Ctrl/⌘ held (which also covers trackpad pinch), after clicking
    // into the box (until the pointer leaves it), or in full-page mode.
    // Stopping the event here, before it reaches the canvas, keeps it away
    // from OrbitControls without blocking the page scroll.
    let zoomArmed = false;
    const onWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey || zoomArmed || expandedRef.current)) e.stopPropagation();
    };
    const arm = () => (zoomArmed = true);
    const disarm = () => (zoomArmed = false);
    container.addEventListener("wheel", onWheel, { capture: true });
    container.addEventListener("pointerdown", arm);
    container.addEventListener("pointerleave", disarm);

    const loop = () => {
      timer.update();
      // Clamp so the animation doesn't jump after being paused off-screen.
      mixer?.update(Math.min(timer.getDelta(), 0.1));
      controls.update();
      renderer.render(scene, camera);
    };

    // Stop rendering entirely while the box is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      renderer.setAnimationLoop(entry.isIntersecting ? loop : null);
    });
    io.observe(container);

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      container.removeEventListener("wheel", onWheel, { capture: true });
      container.removeEventListener("pointerdown", arm);
      container.removeEventListener("pointerleave", disarm);
      mixer?.stopAllAction();
      timer.dispose();
      controls.dispose();
      controlsRef.current = null;
      stage.dispose();
    };
  }, [modelUrl]);

  // On touch screens, one finger scrolls the page past the box and two
  // fingers rotate/zoom; in full-page mode one finger rotates.
  useEffect(() => {
    expandedRef.current = expanded;
    const controls = controlsRef.current;
    if (!controls) return;
    controls.touches.ONE = expanded ? THREE.TOUCH.ROTATE : null;
    controls.domElement!.style.touchAction = expanded ? "none" : "pan-y";
  }, [expanded]);

  return (
    <div className={styles.wrap}>
      <div
        ref={containerRef}
        className={`${styles.viewer} ${loaded ? styles.loaded : ""}`}
        role="img"
        aria-label={label}
      />
      {loaded ? (
        <>
          <p className={styles.status}>
            <span className={styles.hintMouse}>Drag to rotate · ⌘/Ctrl + scroll to zoom</span>
            <span className={styles.hintTouch}>
              {expanded ? "Drag to rotate · pinch to zoom" : "Two fingers to rotate and zoom"}
            </span>
          </p>
          <div className={styles.zoom}>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => controlsRef.current?.dollyIn(ZOOM_STEP)}
            >
              +
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => controlsRef.current?.dollyOut(ZOOM_STEP)}
            >
              &minus;
            </button>
          </div>
        </>
      ) : (
        <p className={styles.loading} role="status">
          Loading 3D model…
        </p>
      )}
    </div>
  );
}
