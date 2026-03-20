import Link from 'next/link';
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.title} style={{ textDecoration: 'none' }}>
          <span className={styles.icon}>⚡</span>
          Quantum
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Dashboard</Link>
          <Link href="/tasks" className={styles.navLink}>Tasks</Link>
          <Link href="/calendar" className={styles.navLink}>Calendar</Link>
        </nav>
      </div>
    </header>
  );
}
