'use client';

import useTasks, { getTodayStr } from '@/features/tasks/hooks/useTasks';
import TaskInput from '@/features/tasks/components/TaskInput';
import TaskItem from '@/features/tasks/components/TaskItem';
import styles from '../page.module.css';
import sectionStyles from '@/features/tasks/components/TaskSections.module.css';

export default function TasksPage() {
  const { tasks, addTask, toggleTask, deleteTask, isCompletedOn } = useTasks();

  const todayStr = getTodayStr();
  const dailyTasks = tasks.filter(t => t.type === 'daily');
  const oneTimeTasks = tasks.filter(t => t.type === 'one-time');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.heading}>All Tasks</h2>
            <p className={styles.subheading}>Manage all your daily and one-time tasks</p>
          </div>
          <p className={styles.stats}>
            {tasks.length} total
          </p>
        </div>

        <TaskInput onAdd={addTask} />

        {dailyTasks.length > 0 && (
          <div className={sectionStyles.section}>
            <h3 className={sectionStyles.sectionTitle}>🔁 Daily Tasks ({dailyTasks.length})</h3>
            <ul className={sectionStyles.taskList}>
              {dailyTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isCompleted={isCompletedOn(task, todayStr)}
                  onToggle={(id) => toggleTask(id, todayStr)}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
          </div>
        )}

        {oneTimeTasks.length > 0 && (
          <div className={sectionStyles.section}>
            <h3 className={sectionStyles.sectionTitle}>📌 One-Time Tasks ({oneTimeTasks.length})</h3>
            <ul className={sectionStyles.taskList}>
              {oneTimeTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isCompleted={isCompletedOn(task, task.date || todayStr)}
                  onToggle={(id) => toggleTask(id, task.date || todayStr)}
                  onDelete={deleteTask}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
