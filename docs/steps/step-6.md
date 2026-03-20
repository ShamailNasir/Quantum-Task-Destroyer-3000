# STEP 6: Task Controls (Sorting, Filtering, UX System)

## 1. Purpose
The goal of this step was to transform the basic task list into a powerful productivity tool by giving the user absolute control over how they view their data. We implemented real-time filtering (by status and dynamic category) and data sorting (by priority, due date, and creation date), alongside visual high-priority highlighting, all while strictly adhering to data immutability.

## 2. Features Implemented
- **Control Panel Dashboard**: Built a unified `<TaskControls />` component featuring specialized dropdown menus directing the layout display.
- **Dynamic Category Extraction**: Instead of hardcoding categories, the system dynamically reads all active tasks and computes a unique, non-repeating list of user-created categories on the fly.
- **Robust Multi-Sorting Logic**: Tasks fundamentally reshuffle organically based on the user's choice:
  - Highest Priority (`high` → `low` driven by assigned integer weightings).
  - Earliest Due (`chronological` date mappings, pushing non-dated tasks to the bottom).
  - Latest Added (default `timestamp` delta sorting).
- **Compound Array Filtering**: Data is safely piped through consecutive Status filters (`Completed`/`Pending`) and Category filters.
- **Explicit DOM Highlighting**: Tasks tagged as "high priority" now actively render a thick red tracking border (`.itemHigh`) to immediately separate urgent focus zones from standard workloads.

## 3. File Structure
```
frontend/src/
├── app/
│   └── page.js                     ← Acts as the computation brain for sorting data
├── features/
│   └── tasks/
│       ├── components/
│       │   ├── TaskControls.js         ← NEW: Input module capturing filter/sort intents
│       │   ├── TaskControls.module.css ← NEW: Associated layout styling grid
│       │   ├── TaskItem.js             ← Conditionally checks and maps `.itemHigh` CSS
│       │   └── TaskItem.module.css     ← Added urgent visual states
│       └── hooks/
│           └── useTasks.js             ← (Remained untouched to aggressively protect raw data)
```

## 4. Code Explanation

### `app/page.js` (The Brain)
We implemented a fundamental React data strategy: **Derived State**. Instead of rewriting `tasks` in `useTasks.js` every time we want to hide a completed item, we leave the source `tasks` completely alone. Inside `page.js`, we established local `useState` variables specifically tracking user intents (`filterStatus`, `sortOption`). We then utilized the React `useMemo` hook to intercept the raw `tasks` array, generate a superficial clone (`[...tasks]`), systematically `.filter()` it, systematically `.sort()` it, and lastly hand that synthetic array (`filteredAndSortedTasks`) to the `<TaskList />` component.

### `features/tasks/components/TaskControls.js`
A stateless controller component. It operates uniquely through "Inverse Data Flow" — it does practically nothing internally except render semantic `.group` inputs. As users natively click dropdowns, it triggers `onChange` event props that reach strictly upwards into `page.js` to mathematically adjust the global configuration settings simultaneously.

## 5. Concepts Learned

- **Derived Data Mapping**: The most important data lifecycle pattern in React. *Never* permanently delete or scramble your master data source just to alter what the user currently sees. Deriving data implies processing raw data "on the fly" right before it renders visually.
- **The `useMemo` Optimization Hook**: Because mathematically `.filter()` and `.sort()` on massive datasets can stall interfaces and consume CPU aggressively, wrapping the calculation in `useMemo` guarantees that the complex sorting calculation *only* triggers if the `tasks` themselves genuinely change, or if the user actively alters a specific `filterOption`.
- **Pure JavaScript Map & Set Extraction**: Generated the categories uniquely by using `tasks.map(t => t.category)` to pull a list of all categories natively, and then wrapping it in `[...new Set(array)]` natively destroying any duplicate entries programmatically.

## 6. Changes Made

| Action | Details |
|--------|---------|
| Concept introduced | Advanced "Derived Data" computations implemented natively using `useMemo` |
| Component initialized | `<TaskControls />` fully bound via Top-Down Prop Drilling |
| CSS customized | Deepened highlighting visual identifiers `.itemHigh` |

## 7. What You Should Understand

1. **Top-Down State Injection**: State flows inherently downwards. `page.js` essentially dictates exactly *what* array `<TaskList />` is legally allowed to render securely, establishing an absolute single source of truth dictating the visuals.
2. **Immutable Arrays**: Executing `[...tasks]` before `.sort()` is absolutely critical. Vanilla `.sort()` technically modifies the original source array mathematically which would break React's tracking systems natively causing unrecoverable rendering bugs! Using the superficial spread clone resolves array references safely.
