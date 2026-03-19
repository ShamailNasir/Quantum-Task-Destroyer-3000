# STEP 2: Basic Application Layout & Structure

## 1. Purpose

The goal of this step was to establish the foundational UI structure and organize the codebase for future scalability. Instead of dumping everything into one folder, we created a thoughtful component architecture using best practices.

## 2. Features Implemented

- Established standard Next.js `src/` folder architecture (`components/`, `features/`, `lib/`).
- Built a reusable `Header` component with scoped CSS Modules.
- Replaced the default Next.js boilerplate with our own CSS design tokens and base layout in `globals.css`.
- Updated the root `layout.js` to wrap every page with the `Header` and a structured `<main>` container.
- Cleaned up the `page.js` home screen to show a simple welcome message.

## 3. File Structure

```
frontend/src/
├── app/
│   ├── globals.css          ← App-wide design tokens & layout
│   ├── layout.js            ← Root layout template
│   ├── page.js              ← Home page UI
│   └── page.module.css      ← Home page scoped styles
├── components/
│   └── Header/              ← Reusable global Header
│       ├── Header.js
│       ├── Header.module.css
│       └── index.js         ← Barrel export for clean imports
├── features/                ← Future domain-specific logic
└── lib/                     ← Future utilities & constants
```

## 4. Code Explanation

### `components/Header/Header.js`
A simple React component returning a `<header>` tag containing the app's title ("⚡ Quantum Task Destroyer"). It imports its scoped class names from `Header.module.css`.

### `app/globals.css`
We removed the messy Next.js default styles and introduced **Design Tokens**: CSS variables in the `:root` selector (`--color-bg`, `--spacing-md`, `--radius-sm`). This guarantees consistency across the app. We also added standard reset rules (removing default margins/padding) and a `.appLayout` class to enforce a full minimum height.

### `app/layout.js`
This file determines the structure of the *whole app*. By importing the `<Header />` here and placing it directly above `{children}`, the Header will remain fixed at the top of the screen no matter what page the user navigates to.

### `app/page.js`
This is just the content of the home page (the `/` route). We replaced the complex Next.js demo with a clean, centered `<h2>` welcome message.

## 5. Concepts Learned

- **Component Architecture**: Breaking UI into reusable pieces (like the `Header`) rather than writing monolithic files.
- **CSS Modules vs. Global CSS**: Global CSS (`globals.css`) is for rules that apply everywhere (like fonts or colors). CSS Modules (`*.module.css`) generate unique class strings so styles *never* collide across different components.
- **Barrel Exports (`index.js`)**: An `index.js` file inside a component folder simply re-exports the main file. This allows clean `import Header from "@/components/Header"` instead of pointing directly to the `.js` file.
- **Next.js Layouts**: `layout.js` is the master template. Anything placed outside of `{children}` (like the Header) becomes persistent UI.

## 6. Changes Made

| Action | Details |
|--------|---------|
| Folders created | `components/Header/`, `features/`, `lib/` |
| Component created | `Header.js` (UI), `Header.module.css` (Styles), `index.js` (Export) |
| Styles updated | `globals.css` configured with variables & resets |
| Layout updated | `layout.js` wrapped with Header and main layout |
| Home updated | `page.js` & `page.module.css` simplified |

## 7. What You Should Understand

After this step, you should know:

1. **How to structure Next.js folders**: Keep reusable UI in `components/`, complex domains in `features/`, and helpers in `lib/`.
2. **How to build a simple component**: A `.js` file for the React code, a `.module.css` file for the styling, and an `index.js` to expose it cleanly.
3. **How persistent layouts work**: Putting the `Header` in `layout.js` makes it render on every single route without needing to copy-paste it into every `page.js` file.
4. **Why Design Tokens matter**: Using CSS variables (`var(--color-bg)`) makes the app easy to theme and guarantees colors match perfectly everywhere.

## 8. Visual Walkthrough

The UI transitioned from the crowded Next.js default page to our custom layout. The page featured a clean, sticky Header bar reading "⚡ Quantum Task Destroyer" with a simple, centered greeting message in the main content area.
