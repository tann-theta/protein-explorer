import type { Category, Protein } from "@/lib/content";
import ProteinFeature from "./ProteinFeature";
import styles from "./CategorySection.module.css";

type Props = {
  category: Category;
  index: number;
  proteins: Protein[];
};

export default function CategorySection({ category, index, proteins }: Props) {
  const headingId = `${category.id}-heading`;
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      {/* Section divider: number, category name, rule, then the blurb.
          The menu links here, so the jump lands right on the title. */}
      <header id={category.id} className={styles.divider}>
        <div className={styles.rule}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <h2 id={headingId} className={styles.title}>
            {category.name}
          </h2>
          <span className={styles.line} aria-hidden="true" />
        </div>
        <p className={styles.blurb}>{category.blurb}</p>
      </header>

      {proteins.map((protein) => (
        <ProteinFeature key={protein.slug} protein={protein} />
      ))}
    </section>
  );
}
