import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SiteBackground from "@/components/SiteBackground";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
import { categories, proteins } from "@/lib/content";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <SiteBackground />
      <Nav />
      <main>
        <Hero />
        <div id="explore" className={styles.explore}>
          {categories.map((category, i) => (
            <CategorySection
              key={category.id}
              category={category}
              index={i}
              proteins={proteins.filter((p) => p.categoryId === category.id)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
