import styles from './TaskItem.module.css';

export default function TaskItem({ task, isCompleted, onToggle, onDelete }) {
  return (
    <li className={`${styles.item} ${isCompleted ? styles.completed : ''}`}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(task.id)}
          className={styles.checkbox}
        />
        <span className={styles.title}>{task.title}</span>
      </label>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        ✕
      </button>
    </li>
  );
}
