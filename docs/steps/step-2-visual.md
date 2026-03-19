# 🏗️ STEP 2: Basic Application Layout & Structure

> [!NOTE]
> **Purpose:** Establish the foundational UI structure and organize the codebase for future scalability. Instead of dumping everything into one folder, we created a thoughtful component architecture using best practices.

## ✨ Features Implemented
- Established standard Next.js `src/` folder architecture (`components/`, `features/`, `lib/`).
- Built a reusable `<Header />` component with scoped CSS Modules.
- Replaced the default Next.js boilerplate with our own CSS design tokens and base layout in `globals.css`.
- Updated the root `layout.js` to wrap every page with the Header and a structured `<main>` container.
- Cleaned up the `page.js` home screen to show a simple welcome message.

---

## 📂 File Structure

| Directory/File | Purpose |
|----------------|---------|
| `components/Header/` | New reusable global Header with its own modular CSS |
| `features/` | Empty directory prepared for future domain-specific logic |
| `lib/` | Empty directory prepared for future utilities & constants |
| `app/globals.css` | Implemented Design Tokens (CSS Variables) for app colors |
| `app/layout.js` | Imported `<Header />` to wrap around all `{children}` |

---

## 🧠 Concepts Learned

> [!TIP]
> **Component Architecture**: Breaking UI into reusable pieces (like the `Header`) rather than writing monolithic files is key to React.

- **CSS Modules vs. Global CSS**: Global CSS (`globals.css`) is for rules that apply everywhere (like fonts or colors). CSS Modules (`*.module.css`) generate unique class strings so styles *never* collide across different components.
- **Barrel Exports (`index.js`)**: An `index.js` file inside a component folder simply re-exports the main file. This allows clean `import Header from "@/components/Header"` instead of pointing directly to the `.js` file.
- **Next.js Layouts**: Anything placed outside of `{children}` (like the Header) in `layout.js` becomes persistent UI across all pages.

---

## 📸 Visual Walkthrough

The UI transitioned from the crowded Next.js default page to our custom layout. The page featured a clean, sticky Header bar reading "⚡ Quantum Task Destroyer" with a simple, centered greeting message in the main content area.
