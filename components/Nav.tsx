import Image from "next/image";
import Link from "next/link";
import CategoryMenu from "./CategoryMenu";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.brand}>
        {/* Low-res stand-in — replace public/logo.png with the full-size logo. */}
        <Image
          src="/logo.png"
          alt=""
          width={26}
          height={30}
          priority
        />
        <span>Protein Explorer</span>
      </Link>
      <CategoryMenu />
    </header>
  );
}
