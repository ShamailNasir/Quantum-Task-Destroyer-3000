import styles from './Calendar.module.css';

export default function CalendarDay({ day, totalTasks, completedCount, pendingCount, isSelected, isToday, onClick }) {
  const hasActivity = totalTasks > 0;
  const allDone = hasActivity && completedCount === totalTasks;

  return (
    <div
      className={`
        ${styles.dayCell}
        ${isSelected ? styles.daySelected : ''}
        ${isToday ? styles.dayToday : ''}
      `}
      onClick={onClick}
    >
      <span className={styles.dayNumber}>{day}</span>

      {hasActivity && (
        <div className={styles.indicators}>
          {allDone ? (
            <span className={`${styles.dot} ${styles.dotCompleted}`} title="All done!" />
          ) : (
            <>
              {pendingCount > 0 && <span className={`${styles.dot} ${styles.dotPending}`} title={`${pendingCount} pending`} />}
              {completedCount > 0 && <span className={`${styles.dot} ${styles.dotCompleted}`} title={`${completedCount} done`} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
