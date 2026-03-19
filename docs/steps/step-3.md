# STEP 3: Core Task System (Bare Minimum Logic)

## 1. Purpose

The goal of this step was to make the application functional by implementing a core task management system. We enabled the ability to CREATE, DISPLAY, UPDATE (toggle complete), and DELETE tasks using React state, while keeping the UI and business logic cleanly separated.

## 2. Features Implemented

- **Task Data Model**: Defined a structured task object containing `id`, `title`, `completed`, and `createdAt`.
- **State Management**: Created a custom `useTasks` hook to handle all state logic inside `features/tasks/`.
- **Add Task**: Implemented a form component (`TaskInput`) that validates and creates new tasks.
- **List Tasks**: Built a `TaskList` component that dynamically renders an array of tasks, handling empty states gracefully.
- **Toggle & Delete**: Built a `TaskItem` component allowing users to cross off tasks or remove them entirely from state.
- **UI Integration**: Connected these components to the Home page (`page.js`) with an auto-updating completion counter.

## 3. File Structure

```
frontend/src/
├── app/
│   ├── page.js                     ← Acts as the container, holding state and passing props
│   └── page.module.css             ← Layout for the task interface
├── features/
│   └── tasks/
│       ├── components/
│       │   ├── TaskInput.js        ← Input form for adding tasks
│       │   ├── TaskInput.module.css
│       │   ├── TaskItem.js         ← Individual task row (checkbox, title, delete btn)
│       │   ├── TaskItem.module.css
│       │   ├── TaskList.js         ← Renders the list of TaskItems
│       │   └── TaskList.module.css
│       └── hooks/
│           └── useTasks.js         ← Core logic (useState, add, toggle, delete)
```

## 4. Code Explanation

### `features/tasks/hooks/useTasks.js`
This is a **Custom Hook**. It uses React's `useState` to hold an array of task objects. It exposes four things: the `tasks` array, and three functions (`addTask`, `toggleTask`, `deleteTask`). By keeping this here, our UI components don't become bloated with logic.

### `features/tasks/components/TaskInput.js`
A standard React form. It maintains its own local state (`title`) as the user types. When submitted, it prevents the default page reload, checks that the input isn't empty, calls the `onAdd` prop (which triggers the `addTask` function in our hook), and clears the input field.

### `features/tasks/components/TaskItem.js`
Represents a single task. It receives a `task` object as a prop, along with `onToggle` and `onDelete` functions. Clicking the checkbox fires `onToggle(task.id)`, and clicking the delete button fires `onDelete(task.id)`. It applies a special `.completed` CSS class if `task.completed` is true.

### `app/page.js`
The conductor of the orchestra. It marks itself with `'use client'` because it handles interactivity. It calls `useTasks()` to get the current tasks and functions, then passes them down as props to `<TaskInput />` and `<TaskList />`. When the hook updates the tasks array, `page.js` re-renders automatically to show the new data.

## 5. Concepts Learned

- **Custom Hooks**: Extracting `useState` and state-modifying functions into a standalone `useSomething.js` file to keep components clean and testable.
- **Prop Drilling (Basics)**: Passing data (`tasks`) and functions (`addTask`, etc.) from a parent component (`page.js`) down to child components.
- **Immutability in React**: In `useTasks.js`, we never push directly to the array. We always use the state setter with a new array (`setTasks(prev => [newTask, ...prev])`) or `.map()` / `.filter()` so React knows to trigger a re-render.
- **Data-Driven UI**: The UI is simply a reflection of the state. If `completed` changes to true, the UI automatically re-renders with the strikethrough class.

## 6. Changes Made

| Action | Details |
|--------|---------|
| Hook created | `useTasks.js` handling strictly task state |
| Components created | `TaskInput`, `TaskItem`, `TaskList` along with scoped CSS modules |
| Page updated | Integrated hooked state into `page.js` |

## 7. What You Should Understand

1. **State vs Props**: State is data managed *inside* a component (or hook) that can change. Props are data passed *down* to a component from its parent.
2. **Separation of Concerns**: UI components (`TaskItem`) shouldn't know *how* to delete a task, they just fire a generic `onDelete` event. The logic hook actually performs the deletion.
3. **Array Methods in React**: `.map()` is used to render lists of items. `.filter()` is used to delete items. `.map()` is also used to toggle specific items based on their unique ID.

## 8. Visual Walkthrough

The app is now fully functional. Here is the active task interface running locally, demonstrating completed tasks receiving strike-through updates:

![Functional Task UI](file:///C:/Users/Ali/.gemini/antigravity/brain/dcac9a34-4c4b-43f7-afb0-4cca8b410c33/completed_task_screenshot_1773869149021.png)
