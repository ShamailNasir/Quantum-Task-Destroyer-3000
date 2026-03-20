'use client';

import { useState } from 'react';
import useTasks, { getTodayStr } from '@/features/tasks/hooks/useTasks';
import WeekStrip from '@/features/dashboard/components/WeekStrip';
import DailyTaskSection from '@/features/tasks/components/DailyTaskSection';
import OneTimeTaskSection from '@/features/tasks/components/OneTimeTaskSection';
import TaskInput from '@/features/tasks/components/TaskInput';
import styles from './page.module.css';

export default function DashboardPage() {
  const {
    tasks, addTask, toggleTask, deleteTask,
    isCompletedOn, getDailyByCategory, getOneTimeTasks
  } = useTasks();

  const [selectedDate, setSelectedDate] = useState(getTodayStr());

  const dailyGrouped = getDailyByCategory();
  const oneTimeTasks = getOneTimeTasks(selectedDate);

  // Quick stats
  const dailyTasks = tasks.filter(t => t.type === 'daily');
  const dailyDone = dailyTasks.filter(t => isCompletedOn(t, selectedDate)).length;
  const totalTasks = tasks.length;
  const allCompleted = tasks.filter(t => isCompletedOn(t, selectedDate)).length;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.heading}>Dashboard</h2>
            <p className={styles.subheading}>Your daily productivity at a glance</p>
          </div>
        </div>

        <WeekStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          tasks={tasks}
          isCompletedOn={isCompletedOn}
        />

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <p className={styles.statValue}>{dailyDone}/{dailyTasks.length}</p>
            <p className={styles.statLabel}>Daily Done</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statValue}>{oneTimeTasks.length}</p>
            <p className={styles.statLabel}>Tasks Today</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statValue}>{totalTasks}</p>
            <p className={styles.statLabel}>Total Tasks</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statValue}>{allCompleted}</p>
            <p className={styles.statLabel}>Completed Today</p>
          </div>
        </div>

        <TaskInput onAdd={addTask} />

        <DailyTaskSection
          groupedTasks={dailyGrouped}
          dateStr={selectedDate}
          isCompletedOn={isCompletedOn}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        <OneTimeTaskSection
          tasks={oneTimeTasks}
          dateStr={selectedDate}
          isCompletedOn={isCompletedOn}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}
