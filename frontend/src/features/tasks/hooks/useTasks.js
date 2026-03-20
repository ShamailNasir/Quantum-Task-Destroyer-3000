import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ai_productivity_tasks';

// Helper to get today's date as YYYY-MM-DD
export function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Sample data seeded on first-ever load
const SAMPLE_TASKS = [
  { id: 'sample-1', title: 'Revise OSPF',        type: 'daily',    category: 'Study',   completedDates: [], date: null, createdAt: Date.now() },
  { id: 'sample-2', title: 'Solve 2 LeetCode problems', type: 'daily', category: 'Study', completedDates: [], date: null, createdAt: Date.now() },
  { id: 'sample-3', title: 'Workout',             type: 'daily',    category: 'Health',  completedDates: [], date: null, createdAt: Date.now() },
  { id: 'sample-4', title: 'Drink water (8 glasses)', type: 'daily', category: 'Health', completedDates: [], date: null, createdAt: Date.now() },
  { id: 'sample-5', title: 'Read 20 pages',       type: 'daily',    category: 'Growth',  completedDates: [], date: null, createdAt: Date.now() },
  { id: 'sample-6', title: 'Skincare routine',    type: 'daily',    category: 'Health',  completedDates: [], date: null, createdAt: Date.now() },
  { id: 'sample-7', title: 'Buy gift for Ali',    type: 'one-time', category: 'Personal', completedDates: [], date: getTodayStr(), createdAt: Date.now() },
  { id: 'sample-8', title: 'Submit assignment',   type: 'one-time', category: 'Study',    completedDates: [], date: getTodayStr(), createdAt: Date.now() },
  { id: 'sample-9', title: 'Research new tech',   type: 'one-time', category: 'Growth',   completedDates: [], date: getTodayStr(), createdAt: Date.now() },
];

function migrateLegacyTask(task) {
  return {
    id: task.id,
    title: task.title || '',
    type: task.type || 'one-time',
    category: task.category || 'General',
    completedDates: task.completedDates || (task.completed ? [getTodayStr()] : []),
    date: task.date || task.dueDate || null,
    createdAt: task.createdAt || Date.now(),
  };
}

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setTasks(parsed.map(migrateLegacyTask));
      } else {
        // First-ever load: seed sample data
        setTasks(SAMPLE_TASKS);
      }
    } catch {
      setTasks(SAMPLE_TASKS);
    }
    setIsLoaded(true);
  }, []);

  // Save on change
  useEffect(() => {
    if (isLoaded) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch {}
    }
  }, [tasks, isLoaded]);

  // Add task
  const addTask = (taskData) => {
    const title = typeof taskData === 'string' ? taskData : taskData.title;
    if (!title?.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      type: taskData.type || 'one-time',
      category: taskData.category?.trim() || 'General',
      completedDates: [],
      date: taskData.type === 'daily' ? null : (taskData.date || getTodayStr()),
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  // Toggle task for a specific date
  const toggleTask = (id, dateStr) => {
    const target = dateStr || getTodayStr();
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        const alreadyDone = task.completedDates.includes(target);
        return {
          ...task,
          completedDates: alreadyDone
            ? task.completedDates.filter(d => d !== target)
            : [...task.completedDates, target],
        };
      })
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Helpers
  const isCompletedOn = (task, dateStr) => {
    const target = dateStr || getTodayStr();
    return task.completedDates.includes(target);
  };

  const getDailyTasks = () => tasks.filter(t => t.type === 'daily');

  const getOneTimeTasks = (dateStr) => {
    const target = dateStr || getTodayStr();
    return tasks.filter(t => t.type === 'one-time' && t.date === target);
  };

  const getTasksForDate = (dateStr) => {
    const daily = getDailyTasks();
    const oneTime = getOneTimeTasks(dateStr);
    return [...daily, ...oneTime];
  };

  // Group daily tasks by category
  const getDailyByCategory = () => {
    const daily = getDailyTasks();
    const grouped = {};
    daily.forEach(t => {
      if (!grouped[t.category]) grouped[t.category] = [];
      grouped[t.category].push(t);
    });
    return grouped;
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    isLoaded,
    isCompletedOn,
    getDailyTasks,
    getOneTimeTasks,
    getTasksForDate,
    getDailyByCategory,
  };
}
