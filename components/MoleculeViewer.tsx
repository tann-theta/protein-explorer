"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { centreModel, createLoader, createStage } from "@/lib/three-stage";
import styles from "./MoleculeViewer.module.css";

type Props = {
  modelUrl: string;
  // Element whose scroll progress (0 → 1) drives one full 360° turn.
  scrollTarget: RefObject<HTMLElement | null>;
  // At rest the molecule sits just below this element, overlapping its lower edge.
  titleRef: RefObject<HTMLElement | null>;
};

const GROWTH = 1.6; // molecule size at the end of the scroll, relative to the start
const MAX_BOX_WIDTH = 900; // px — keeps the molecule from getting huge on wide screens
const CAMERA_Z = 3;

// Soft radial gradient used for the glow behind the molecule.
function makeHaloTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(199, 48, 42, 0.85)");
  g.addColorStop(0.4, "rgba(173, 26, 26, 0.45)");
  g.addColorStop(1, "rgba(173, 26, 26, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function MoleculeViewer({ modelUrl, scrollTarget, titleRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stage = createStage(container, { rimColor: 0xff4a3a });
    const { renderer, scene, camera } = stage;
    camera.position.set(0, 0, CAMERA_Z);

    // Spinner holds the scroll-driven Y rotation; the model is centred inside it.
    const spinner = new THREE.Group();
    scene.add(spinner);

    const haloTexture = makeHaloTexture();
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: haloTexture,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        opacity: 0.8,
      }),
    );
    halo.renderOrder = -1;
    scene.add(halo);

    let modelRadius = 0.4;
    let disposed = false;

    // Layout in pixels, recomputed on resize.
    const layout = { w: 1, h: 1, startRadius: 100, startY: 0.5, endY: 0.5 };

    createLoader().load(modelUrl, (gltf) => {
      if (disposed) return;
      modelRadius = centreModel(gltf.scene);
      spinner.add(gltf.scene);
      resize();
      setLoaded(true);
    });

    function resize() {
      if (!container) return;
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // Free area under the title (overlapping its lower edge a little).
      let top = h * 0.2;
      const title = titleRef.current;
      if (title) {
        const fontSize = parseFloat(getComputedStyle(title).fontSize);
        top = title.offsetTop + title.offsetHeight - fontSize * 0.2;
      }
      const boxH = h - top;
      const boxMin = Math.min(Math.min(w, MAX_BOX_WIDTH), boxH);

      layout.w = w;
      layout.h = h;
      layout.startRadius = (boxMin / 2) / 0.82;
      layout.startY = top + boxH / 2;
      layout.endY = h / 2;
    }

    function scrollProgress() {
      const el = scrollTarget.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) return 0;
      return THREE.MathUtils.clamp(-rect.top / range, 0, 1);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    let progress = scrollProgress();
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      // Ease toward the scroll position so wheel steps feel smooth.
      progress += (scrollProgress() - progress) * 0.08;
      const grow = THREE.MathUtils.smoothstep(progress, 0, 1);

      const worldPerPx = (2 * CAMERA_Z * tanHalfFov) / layout.h;
      const radiusPx = layout.startRadius * THREE.MathUtils.lerp(1, GROWTH, grow);
      const centreY = THREE.MathUtils.lerp(layout.startY, layout.endY, grow);
      const y = -(centreY - layout.h / 2) * worldPerPx;
      const radius = radiusPx * worldPerPx;

      spinner.rotation.y = progress * Math.PI * 2;
      spinner.scale.setScalar(radius / modelRadius);
      spinner.position.y = y;

      const haloZ = -radius * 0.6;
      halo.position.set(0, y, haloZ);
      // Halo is ~3.4× the molecule, capped so it stays faint on narrow screens.
      const haloPx = Math.min(radiusPx * 3.4, layout.w * 1.4);
      // Towards the end, shrink it so its glow fades out before the stage's
      // bottom edge; otherwise it's clipped into a hard line as the hero
      // scrolls away. (It sits behind the model, so perspective shrinks it.)
      const depthScale = (CAMERA_Z - haloZ) / CAMERA_Z;
      const fitPx = 2 * (layout.h - centreY) * depthScale;
      const fitAmount = THREE.MathUtils.smoothstep(progress, 0.5, 0.95);
      const sizePx = THREE.MathUtils.lerp(haloPx, Math.min(haloPx, fitPx), fitAmount);
      halo.scale.setScalar(sizePx * worldPerPx);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      halo.material.dispose();
      haloTexture.dispose();
      stage.dispose();
    };
  }, [modelUrl, scrollTarget, titleRef]);

  return (
    <div
      ref={containerRef}
      className={`${styles.viewer} ${loaded ? styles.loaded : ""}`}
      role="img"
      aria-label="3D model of hemoglobin (PDB 4HHB)"
    />
  );
}
