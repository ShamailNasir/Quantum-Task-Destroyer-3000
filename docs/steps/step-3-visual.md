# 🎯 STEP 3: Core Task System (Bare Minimum Logic)

> [!NOTE]
> **Purpose:** Make the application functional by implementing a core task management system. We enabled the ability to CREATE, DISPLAY, UPDATE, and DELETE tasks using React state, keeping UI and logic cleanly separated.

## ✨ Features Implemented
- **Task Data Model**: Defined a task containing `id`, `title`, `completed`, and `createdAt`.
- **State Management**: Created a custom `useTasks` hook to handle all state logic.
- **Add Task**: Implemented a form component (`TaskInput.js`) that creates tasks.
- **List Tasks**: Built a `TaskList.js` component that dynamically renders arrays.
- **Toggle & Delete**: Built a `TaskItem.js` allowing users to cross off tasks or remove them entirely.
- **UI Integration**: Connected these to the Home page with a live completion counter.

---

## 📂 File Structure

| Directory/File | Purpose |
|----------------|---------|
| `app/page.js` | Container holding the state and passing it down via hooks |
| `features/tasks/hooks/useTasks.js` | Custom hook containing all the strict state logic |
| `features/tasks/components/TaskInput.js` | Input form for adding new tasks |
| `features/tasks/components/TaskItem.js` | Individual task row containing checkbox/delete logic |
| `features/tasks/components/TaskList.js` | Loops through tasks and renders `TaskItem` components |

---

## 🧠 Concepts Learned

> [!IMPORTANT]
> **Data-Driven UI**: The UI is simply a reflection of state. If a task's `completed` boolean changes to true, the UI automatically redraws it with the strikethrough CSS!

- **Custom Hooks**: Extracting `useState` into a standalone `useSomething.js` file keeps components clean and testable.
- **Prop Drilling (Basics)**: Passing data and functions from a parent (`page.js`) down to child components.
- **Immutability rendering**: In `useTasks.js`, we use `.map()` to update lists and `.filter()` to delete, ensuring React knows to trigger a re-render.

---

## 📸 Visual Walkthrough

The app is now fully functional. Here is the active task interface running locally, demonstrating completed tasks receiving strike-through updates:

![Functional Task UI](file:///C:/Users/Ali/.gemini/antigravity/brain/dcac9a34-4c4b-43f7-afb0-4cca8b410c33/completed_task_screenshot_1773869149021.png)
