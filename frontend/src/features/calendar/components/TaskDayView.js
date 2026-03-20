import styles from './Calendar.module.css';

export default function TaskDayView({ selectedDate, tasks, isCompletedOn, onToggle, onDelete }) {
  const displayDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const dailyTasks = tasks.filter(t => t.type === 'daily');
  const oneTimeTasks = tasks.filter(t => t.type === 'one-time');

  return (
    <div className={styles.taskViewContainer}>
      <h3 className={styles.taskViewHeader}>📅 {displayDate}</h3>

      {tasks.length === 0 ? (
        <p className={styles.emptyMsg}>No tasks for this day. Enjoy! 🎉</p>
      ) : (
        <>
          {dailyTasks.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <p className={styles.dayViewSubtitle}>🔁 Daily</p>
              <ul className={styles.taskList}>
                {dailyTasks.map(task => {
                  const done = isCompletedOn(task, selectedDate);
                  return (
                    <li key={task.id} className={`${styles.taskItem} ${done ? styles.taskItemCompleted : styles.taskItemNormal}`} >
                      <label className={styles.taskItemLabel}>
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => onToggle(task.id, selectedDate)}
                          className={styles.taskItemCheckbox}
                        />
                        <span className={styles.taskViewTargetTitle}>{task.title}</span>
                      </label>
                      {done && <span className={styles.doneBadge}>✓</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {oneTimeTasks.length > 0 && (
            <div>
              <p className={styles.dayViewSubtitle}>📌 One-time</p>
              <ul className={styles.taskList}>
                {oneTimeTasks.map(task => {
                  const done = isCompletedOn(task, selectedDate);
                  return (
                    <li key={task.id} className={`${styles.taskItem} ${done ? styles.taskItemCompleted : styles.taskItemNormal}`}>
                      <label className={styles.taskItemLabel}>
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => onToggle(task.id, selectedDate)}
                          className={styles.taskItemCheckbox}
                        />
                        <span className={styles.taskViewTargetTitle}>{task.title}</span>
                      </label>
                      {done && <span className={styles.doneBadge}>✓</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
