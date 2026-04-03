import TaskItem from './TaskItem';
import styles from './TaskSections.module.css';

export default function OneTimeTaskSection({ tasks, dateStr, isCompletedOn, onToggle, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.categoryHeader}>
        <span className={styles.categoryIcon}>📌</span>
        One-Time Tasks
      </h3>
      
      <div className={styles.taskList}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            isCompleted={isCompletedOn(task, dateStr)}
            onToggle={(id) => onToggle(id, dateStr)}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
