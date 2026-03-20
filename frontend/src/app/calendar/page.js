'use client';

import { useState } from 'react';
import useTasks, { getTodayStr } from '@/features/tasks/hooks/useTasks';
import CalendarContainer from '@/features/calendar/components/CalendarContainer';
import CalendarGrid from '@/features/calendar/components/CalendarGrid';
import TaskDayView from '@/features/calendar/components/TaskDayView';

export default function CalendarPage() {
  const { tasks, isCompletedOn, toggleTask, deleteTask } = useTasks();

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(getTodayStr());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Gather tasks for selected day
  const dailyTasks = tasks.filter(t => t.type === 'daily');
  const oneTimeTasks = tasks.filter(t => t.type === 'one-time' && t.date === selectedDate);
  const selectedDayTasks = [...dailyTasks, ...oneTimeTasks];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px' }}>
      <CalendarContainer
        currentMonth={currentDate.getMonth()}
        currentYear={currentDate.getFullYear()}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      >
        <CalendarGrid
          currentMonth={currentDate.getMonth()}
          currentYear={currentDate.getFullYear()}
          tasks={tasks}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          isCompletedOn={isCompletedOn}
        />

        <TaskDayView
          selectedDate={selectedDate}
          tasks={selectedDayTasks}
          isCompletedOn={isCompletedOn}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </CalendarContainer>
    </div>
  );
}
