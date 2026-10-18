import styles from "./SiteBackground.module.css";

// Deep aquamarine on the left easing to black on the right, drifting slowly,
// with fine grain on top so the gradient never bands.
export default function SiteBackground() {
  return <div className={styles.bg} aria-hidden="true" />;
}
