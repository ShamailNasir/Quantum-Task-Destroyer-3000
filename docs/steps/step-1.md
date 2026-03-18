# STEP 1: Initialize Next.js Frontend

## 1. Purpose

Set up the frontend foundation for the AI Productivity App using Next.js inside a `frontend/` folder. This gives us a working development environment and a clean starting point to build on.

## 2. Features Implemented

- Next.js project initialized with App Router
- JavaScript setup (no TypeScript)
- ESLint enabled for code quality
- `src/` directory structure for cleaner organization
- Path alias (`@/`) configured for clean imports
- Vanilla CSS (no frameworks like Tailwind)
- Dev server running at `http://localhost:3000`

## 3. File Structure

```
frontend/
├── public/                  ← Static assets (images, icons)
├── src/
│   └── app/                 ← App Router directory
│       ├── layout.js        ← Root layout (wraps all pages)
│       ├── page.js          ← Home page component
│       ├── globals.css      ← Global styles
│       ├── page.module.css  ← Scoped styles for page.js
│       └── favicon.ico      ← Browser tab icon
├── package.json             ← Dependencies + scripts
├── next.config.mjs          ← Next.js configuration
├── jsconfig.json            ← Path alias settings
├── eslint.config.mjs        ← Linting rules
└── .gitignore               ← Files Git should ignore
```

## 4. Code Explanation

### `layout.js` — The Root Layout
Every page in Next.js is rendered **inside** this file. Think of it as a frame around your content.
- Loads Google Fonts (Geist Sans and Geist Mono)
- Sets the `<html>` language to English
- Applies font variables to `<body>`
- Renders `{children}` — the current page content

### `page.js` — The Home Page
This is the default starter page shown at `/`. It currently displays the Next.js welcome content. We will replace this in the next step.

### `globals.css` — Global Styles
Applies to the entire app:
- Defines light/dark color variables (`--background`, `--foreground`)
- Resets all margins, padding, and box-sizing
- Sets base font and link styles

### `package.json` — Project Configuration
Lists the three core dependencies:
- `next` (v16.1.7) — the framework
- `react` (v19.2.3) — the UI library
- `react-dom` (v19.2.3) — renders React to the browser

Available scripts:
- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — serve production build

### `jsconfig.json` — Import Aliases
Maps `@/*` to `./src/*` so you can write:
```js
import Button from "@/components/Button";
// instead of:
import Button from "../../../components/Button";
```

### `next.config.mjs` — Framework Config
Empty for now. Used later for custom domains, redirects, environment variables, etc.

## 5. Concepts Learned

- **Next.js App Router**: The modern way Next.js handles pages — each folder inside `app/` becomes a route
- **Layout system**: `layout.js` wraps every page, so shared UI (headers, footers) goes here
- **CSS Modules**: `page.module.css` styles only apply to the component that imports them — no style leaking
- **Path aliases**: `@/` shortcut keeps imports clean as the project grows
- **Dev server**: `npm run dev` starts a local server with hot reload — changes appear instantly

## 6. Changes Made

| Action | Details |
|--------|---------|
| Created `frontend/` | Next.js project via `create-next-app` |
| Configuration | App Router, JS, ESLint, `src/` dir, no Tailwind |
| Verified | Dev server running at `http://localhost:3000` |

## 7. What You Should Understand

After this step, you should know:

1. **What Next.js is** — a React framework that handles routing, rendering, and tooling for you
2. **How the App Router works** — folders = routes, `page.js` = what renders, `layout.js` = wrapper
3. **Why we use `src/`** — separates source code from config files at the root
4. **What `globals.css` vs `page.module.css` means** — global styles vs component-scoped styles
5. **How to run the project** — `cd frontend && npm run dev`
6. **What `@/` imports are** — a shortcut to avoid ugly relative paths like `../../..`
