"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { Protein } from "@/lib/content";
import ModelViewer from "./ModelViewer";
import styles from "./ProteinFeature.module.css";

// Renders *text* as italics (used for species names).
function withItalics(text: string) {
  return text.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>,
  );
}

export default function ProteinFeature({ protein }: { protein: Protein }) {
  const [show3d, setShow3d] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // While expanded: Escape closes it, and the page behind doesn't scroll.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [expanded]);

  // Only play the video while it's on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [show3d]);

  return (
    <article id={protein.slug} className={styles.feature}>
      <div className={styles.copy}>
        <h3 className={styles.name}>{protein.name}</h3>
        <span className={styles.badge}>{protein.organism}</span>
        {protein.description.map((para, i) => (
          <p key={i}>{withItalics(para)}</p>
        ))}
      </div>

      <div className={`${styles.media} ${expanded ? styles.expanded : ""}`}>
        <div className={styles.box}>
          <button
            type="button"
            className={styles.expand}
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Exit full page" : `Expand ${protein.name} to full page`}
            aria-pressed={expanded}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {expanded ? (
                <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" />
              ) : (
                <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
              )}
            </svg>
          </button>
          {show3d ? (
            <ModelViewer
              modelUrl={protein.model}
              label={`Interactive 3D model of ${protein.name} (PDB ${protein.pdbId})`}
            />
          ) : (
            <video
              ref={videoRef}
              className={styles.video}
              src={protein.video}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`Animation of ${protein.name}`}
            />
          )}
        </div>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShow3d((v) => !v)}
          aria-label={
            show3d
              ? `Back to the ${protein.name} video`
              : `Explore ${protein.name} in 3D`
          }
        >
          {show3d ? (
            <>
              <span aria-hidden="true">&larr;</span> Back to video
            </>
          ) : (
            <>
              Explore further <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
