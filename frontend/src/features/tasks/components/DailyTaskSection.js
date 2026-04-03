import TaskItem from './TaskItem';
import styles from './TaskSections.module.css';

const CATEGORY_ICONS = {
  Study: '📚', Health: '💪', Growth: '🌱', Personal: '✨', General: '📋',
};

export default function DailyTaskSection({
  groupedTasks,
  dateStr,
  isCompletedOn,
  onToggle,
  onDelete,
  onEdit
}) {
  const categories = Object.keys(groupedTasks);

  if (categories.length === 0) {
    return <p className={styles.emptyMsg}>No daily tasks set up yet.</p>;
  }

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>🔁 Daily Tasks</h3>
      {categories.map(cat => (
        <div key={cat} className={styles.categoryBlock}>
          <h4 className={styles.categoryTitle}>
            {CATEGORY_ICONS[cat] || '📋'} {cat}
          </h4>
          <ul className={styles.taskList}>
            {groupedTasks[cat].map(task => (
              <TaskItem
                key={task.id}
                task={task}
                isCompleted={isCompletedOn(task, dateStr)}
                onToggle={(id) => onToggle(id, dateStr)}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
