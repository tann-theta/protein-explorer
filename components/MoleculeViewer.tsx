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

const MAX_BOX_WIDTH = 900; // px — keeps the starting molecule from getting huge on wide screens
// At the end of the spin the molecule is sized to the screen: as wide as
// FINAL_WIDTH of the screen or as tall as FINAL_HEIGHT of the area below the
// header, whichever is smaller. Width limits phones, height limits laptops.
const FINAL_WIDTH = 0.86;
const FINAL_HEIGHT = 0.72;
const MAX_START_RATIO = 0.8; // the starting size is at most this much of the final size
const EASE = 0.14; // how quickly the spin catches up with the scroll position (per frame)
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

    const stage = createStage(container, { rimColor: 0xff4a3a, keepFrame: true });
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
    // The model's half-width (widest over a full turn) and half-height, as
    // fractions of its bounding-sphere radius. Used to size it to the screen.
    let extentW = 0.83;
    let extentH = 0.56;
    let disposed = false;

    // Layout in pixels, recomputed on resize.
    const layout = { w: 1, h: 1, startRadius: 100, endRadius: 160, startY: 0.5, endY: 0.5 };

    createLoader().load(modelUrl, (gltf) => {
      if (disposed) return;
      modelRadius = centreModel(gltf.scene);
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const half = (lo: number, hi: number) => Math.max(Math.abs(lo), Math.abs(hi));
      extentW = Math.hypot(half(box.min.x, box.max.x), half(box.min.z, box.max.z)) / modelRadius;
      extentH = half(box.min.y, box.max.y) / modelRadius;
      spinner.add(gltf.scene);
      resize();
      // Keep drawing through the fade-in: a frame drawn while the canvas is
      // still invisible can be dropped by the browser.
      requestDraw(1800);
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

      // Final size and position: centred in the area below the fixed header.
      const navH =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
      const availH = h - navH;
      const endRadius = Math.min(
        (FINAL_WIDTH * w) / 2 / extentW,
        (FINAL_HEIGHT * availH) / 2 / extentH,
      );

      layout.w = w;
      layout.h = h;
      layout.endRadius = endRadius;
      layout.startRadius = Math.min(boxMin / 2 / 0.82, endRadius * MAX_START_RATIO);
      layout.startY = top + boxH / 2;
      layout.endY = navH + availH / 2;

      // Tell the page how much empty space is left under the molecule when
      // the spin ends, so the first category can start just below it
      // (used by .explore in app/page.module.css).
      const finalBottom = layout.endY + endRadius * extentH;
      document.documentElement.style.setProperty(
        "--hero-tail",
        `${Math.max(0, Math.round(h - finalBottom))}px`,
      );
      requestDraw();
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
    let dirty = true;
    let drawUntil = 0;

    // Only draw when something changed. The loop runs while the molecule is
    // still easing towards the scroll position, then stops until the next
    // scroll or resize, so an idle page costs nothing.
    function requestDraw(keepDrawingMs = 0) {
      dirty = true;
      drawUntil = Math.max(drawUntil, performance.now() + keepDrawingMs);
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function tick() {
      frame = 0;
      // Ease toward the scroll position so wheel steps feel smooth.
      const gap = scrollProgress() - progress;
      if (Math.abs(gap) > 0.0002) {
        progress += gap * EASE;
        dirty = true;
      } else if (gap !== 0) {
        progress += gap;
        dirty = true;
      }
      if (!dirty && performance.now() > drawUntil) return;
      dirty = false;
      draw();
      frame = requestAnimationFrame(tick);
    }

    function draw() {
      const grow = THREE.MathUtils.smoothstep(progress, 0, 1);

      const worldPerPx = (2 * CAMERA_Z * tanHalfFov) / layout.h;
      const radiusPx = THREE.MathUtils.lerp(layout.startRadius, layout.endRadius, grow);
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
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    requestDraw();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.removeProperty("--hero-tail");
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
