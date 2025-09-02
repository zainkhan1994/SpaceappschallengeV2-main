# Updated Copilot Instructions for SpaceappschallengeV2-main

## Project Overview
This is a Vite + React + TypeScript web app for the NASA Space Apps Challenge with two main modes:
1. **Landing Page Mode** - Static event information and registration
2. **Challenge Explorer Mode** - Interactive challenge browsing with 3D visualization

## Architecture & Patterns
- **Entry Point:** `src/main.tsx` mounts `<App />` to the DOM
- **App Layout:** `src/App.tsx` composes all sections as React components
- **Navigation:** Header uses scroll-to-section AND route-based navigation for different modes
- **Styling:** Tailwind CSS with proper PostCSS configuration
- **Images:** Place in `/public/Pictures/` for production serving
- **Icons:** Uses `lucide-react` for SVG icons

## Critical Configuration Files
- **`postcss.config.js`:** Must contain `tailwindcss` and `autoprefixer` plugins
- **`tailwind.config.js`:** Only Tailwind-specific plugins, NOT PostCSS plugins
- **`vite.config.ts`:** Exclude Python directories from scanning

## Data Architecture
- **Challenge Data:** Stored in `src/data/` directory
- **Types:** TypeScript interfaces in `src/types/`
- **Components:** Modular sections in `src/components/`

## Common Pitfalls (Based on Experience)
1. **Never mix TypeScript code in CSS files** - Keep `.css` and `.tsx` separate
2. **PostCSS plugins go in `postcss.config.js`, NOT `tailwind.config.js`**
3. **Exclude Python venv directories in Vite config**
4. **Use proper TypeScript tuple types for positions: `[number, number, number]`**

## Safe Development Workflow
1. Always test with `npm run dev` after config changes
2. Clear Vite cache with `rm -rf node_modules/.vite` if issues persist
3. Keep existing components intact when adding new features
4. Use additive approach - add new components rather than modifying core ones
