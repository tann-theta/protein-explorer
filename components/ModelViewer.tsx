"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { centreModel, createLoader, createStage } from "@/lib/three-stage";
import styles from "./ModelViewer.module.css";

type Props = {
  modelUrl: string;
  label: string;
};

const ZOOM_STEP = 0.8; // each +/− click moves the camera 20% closer or further

// Interactive model: drag to rotate, scroll/pinch or +/− to zoom,
// slow auto-spin when idle.
export default function ModelViewer({ modelUrl, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
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

    renderer.setAnimationLoop(() => {
      timer.update();
      mixer?.update(timer.getDelta());
      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      ro.disconnect();
      mixer?.stopAllAction();
      timer.dispose();
      controls.dispose();
      controlsRef.current = null;
      stage.dispose();
    };
  }, [modelUrl]);

  return (
    <div className={styles.wrap}>
      <div
        ref={containerRef}
        className={`${styles.viewer} ${loaded ? styles.loaded : ""}`}
        role="img"
        aria-label={label}
      />
      <p className={styles.status} aria-live="polite">
        {loaded ? "Drag to rotate \u00b7 scroll to zoom" : "Loading 3D model\u2026"}
      </p>
      {loaded && (
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
      )}
    </div>
  );
}
