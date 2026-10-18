"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/lib/content";
import MoleculeViewer from "./MoleculeViewer";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Expose scroll progress (0 → 1) as --progress so CSS can fade the title.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0;
      section.style.setProperty("--progress", p.toFixed(4));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    // Tall section: the inner stage stays pinned while the molecule turns,
    // then releases into the next section once the 360° is complete.
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.stage}>
        <div ref={headingRef} className={styles.heading}>
          <h1 className={styles.title}>Protein Explorer</h1>
          <p className={styles.headline}>{hero.headline}</p>
          <p className={styles.subheadline}>{hero.subheadline}</p>
        </div>
        <div className={styles.molecule}>
          <MoleculeViewer
            modelUrl="/models/4HHB_hemoglobin.glb"
            scrollTarget={sectionRef}
            titleRef={headingRef}
          />
        </div>
      </div>
    </section>
  );
}
