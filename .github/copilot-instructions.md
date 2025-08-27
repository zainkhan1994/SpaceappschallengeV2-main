# Copilot Instructions for SpaceappschallengeV2-main

## Project Overview
This is a Vite + React + TypeScript web app for the NASA Space Apps Challenge. The codebase is organized for rapid prototyping and modularity, with all main UI sections as React components in `src/components/`.

## Architecture & Patterns
- **Entry Point:** `src/main.tsx` mounts `<App />` to the DOM.
- **App Layout:** `src/App.tsx` composes all major sections (Header, Hero, Winners, etc.) as React components. Each section is a separate file in `src/components/`.
- **Navigation:** The header uses a scroll-to-section pattern, with section IDs matching navigation items.
- **Styling:** Uses Tailwind CSS (`index.css`, `tailwind.config.js`). Custom classes may be present for special UI elements.
- **Images:** Static images are referenced from `/Pictures/`, but for production, place images in `/public/Pictures/` for correct serving.
- **Icons:** Uses `lucide-react` for SVG icons.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (Vite hot-reloads changes)
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`
- **Lint:** `npm run lint`
- **No built-in tests** (as of current codebase)

## Conventions & Gotchas
- **React/JSX:** Use `className` (not `class`) for styling in components.
- **Section IDs:** For scroll navigation, section IDs in components must match those in the header nav.
- **Component Structure:** Each major page section is a separate file in `src/components/`. Example: `Winners.tsx`, `Hero.tsx`, etc.
- **Image Paths:** For local dev, `/Pictures/xyz.png` works if the dev server is configured to serve from root. For production, use `/public/Pictures/xyz.png`.
- **No global state management** (Redux, Context) is used; state is local to components.

## Integration Points
- **External:** No backend/API integration; all data is static or hardcoded in components.
- **Dependencies:** See `package.json` for all dependencies. Key ones: `react`, `react-dom`, `lucide-react`, `tailwindcss`, `vite`.

## Example: Adding a New Section
1. Create a new file in `src/components/` (e.g., `NewSection.tsx`).
2. Add your component and export it.
3. Import and render it in `src/App.tsx`.
4. Add a nav item in `Header.tsx` if needed, and ensure section IDs match.

## Key Files
- `src/App.tsx`: Main app layout and section composition
- `src/components/`: All major UI sections
- `vite.config.ts`: Vite config, including React plugin
- `tailwind.config.js`: Tailwind CSS config
- `package.json`: Scripts and dependencies

---

If any conventions or workflows are unclear, please provide feedback so this guide can be improved for future AI agents.
