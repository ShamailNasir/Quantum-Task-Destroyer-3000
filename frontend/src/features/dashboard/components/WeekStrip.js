import styles from './WeekStrip.module.css';

export default function WeekStrip({ selectedDate, onSelectDate, tasks, isCompletedOn }) {
  // Generate 7 days centered on today
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDateStr = (d) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const todayStr = formatDateStr(today);

  return (
    <div className={styles.strip}>
      {days.map(d => {
        const dateStr = formatDateStr(d);
        const isSelected = dateStr === selectedDate;
        const isToday = dateStr === todayStr;

        // Count completions for this day
        const dailyTasks = tasks.filter(t => t.type === 'daily');
        const dailyCompleted = dailyTasks.filter(t => isCompletedOn(t, dateStr)).length;
        const dailyTotal = dailyTasks.length;
        const ratio = dailyTotal > 0 ? dailyCompleted / dailyTotal : 0;

        return (
          <button
            key={dateStr}
            className={`${styles.day} ${isSelected ? styles.daySelected : ''} ${isToday ? styles.dayToday : ''}`}
            onClick={() => onSelectDate(dateStr)}
          >
            <span className={styles.dayName}>{dayNames[d.getDay()]}</span>
            <span className={styles.dayNum}>{d.getDate()}</span>
            {dailyTotal > 0 && (
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${ratio * 100}%` }} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
