import CalendarDay from './CalendarDay';
import styles from './Calendar.module.css';

export default function CalendarGrid({
  currentMonth,
  currentYear,
  tasks,
  selectedDate,
  onSelectDate,
  isCompletedOn
}) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getDateStr = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const todayStr = getDateStr(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>
        {weekdays.map(day => (
          <div key={day} className={styles.weekdayLabel}>{day}</div>
        ))}

        {blanks.map(b => (
          <div key={`blank-${b}`} className={`${styles.dayCell} ${styles.dayEmpty}`} />
        ))}

        {days.map(day => {
          const dateStr = getDateStr(currentYear, currentMonth, day);

          // Collect tasks relevant to this day
          const dailyTasks = tasks.filter(t => t.type === 'daily');
          const oneTimeTasks = tasks.filter(t => t.type === 'one-time' && t.date === dateStr);
          const dayTasks = [...dailyTasks, ...oneTimeTasks];

          const completedCount = dayTasks.filter(t => isCompletedOn(t, dateStr)).length;
          const pendingCount = dayTasks.length - completedCount;

          return (
            <CalendarDay
              key={dateStr}
              day={day}
              dateStr={dateStr}
              totalTasks={dayTasks.length}
              completedCount={completedCount}
              pendingCount={pendingCount}
              isSelected={selectedDate === dateStr}
              isToday={todayStr === dateStr}
              onClick={() => onSelectDate(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
}
