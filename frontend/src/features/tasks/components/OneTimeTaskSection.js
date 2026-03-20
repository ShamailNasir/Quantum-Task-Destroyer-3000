import TaskItem from './TaskItem';
import styles from './TaskSections.module.css';

export default function OneTimeTaskSection({ tasks, dateStr, isCompletedOn, onToggle, onDelete }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>📌 Tasks for Today</h3>
      {tasks.length === 0 ? (
        <p className={styles.emptyMsg}>No one-time tasks for this day.</p>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isCompleted={isCompletedOn(task, dateStr)}
              onToggle={(id) => onToggle(id, dateStr)}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
