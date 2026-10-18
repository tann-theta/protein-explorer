"use client";

import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/content";
import styles from "./CategoryMenu.module.css";

// Three-line button that drops down a list of categories.
export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // A shared link like /#glow should open at that section; the browser
  // doesn't do this on its own here, so jump there once the page is up.
  // Wait for the load event, after which the browser stops restoring the
  // old scroll position.
  useEffect(() => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    const jump = () => setTimeout(() => target.scrollIntoView({ behavior: "instant" }), 50);
    if (document.readyState === "complete") jump();
    else window.addEventListener("load", jump, { once: true });
    return () => window.removeEventListener("load", jump);
  }, []);

  // Close on Escape or on a click outside the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={`${styles.button} ${open ? styles.open : ""}`}
        aria-expanded={open}
        aria-controls="category-menu"
        aria-label={open ? "Close categories" : "Open categories"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="category-menu"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        aria-label="Protein categories"
        inert={!open}
      >
        <ol>
          {categories.map((c, i) => (
            <li key={c.id} style={{ transitionDelay: open ? `${60 + i * 25}ms` : "0ms" }}>
              <a href={`#${c.id}`} onClick={() => setOpen(false)}>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                {c.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
