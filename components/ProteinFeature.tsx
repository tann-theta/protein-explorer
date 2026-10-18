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

// How far outside the screen a box can be and still keep its 3D viewer.
// About 2–3 viewers exist at once; the rest are torn down to save memory.
const NEAR_MARGIN = "75% 0px";

export default function ProteinFeature({ protein }: { protein: Protein }) {
  const [expanded, setExpanded] = useState(false);
  const [near, setNear] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Create the 3D viewer only while the box is near the screen, and dispose
  // of it (freeing its WebGL context) once it's far away again.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: NEAR_MARGIN,
    });
    io.observe(box);
    return () => io.disconnect();
  }, []);

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
        <div ref={boxRef} className={styles.box}>
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
          {(near || expanded) && (
            <ModelViewer
              modelUrl={protein.model}
              label={`Interactive 3D model of ${protein.name} (PDB ${protein.pdbId})`}
              expanded={expanded}
            />
          )}
        </div>
      </div>
    </article>
  );
}
