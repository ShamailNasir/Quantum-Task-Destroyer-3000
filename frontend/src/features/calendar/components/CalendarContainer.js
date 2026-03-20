import styles from './Calendar.module.css';

export default function CalendarContainer({ currentMonth, currentYear, onPrev, onNext, children }) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onPrev} className={styles.navButton}>← Prev</button>
        <h2 className={styles.monthTitle}>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={onNext} className={styles.navButton}>Next →</button>
      </div>
      
      {children}
    </div>
  );
}
