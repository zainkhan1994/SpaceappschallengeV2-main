# NASA Space Apps Challenge - Houston 2025

Website for the 2025 NASA International Space Apps Challenge in Houston, October 4-5.

## Overview

This is a Vite + React + TypeScript web application featuring:
- Event information and registration
- Interactive 3D challenge explorer
- Team profiles and winners showcase
- Resources and schedule

## Quick Start

### Prerequisites
- Node.js 18.x or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit http://localhost:5173 to view the site.

### Build

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

**This project deploys to Vercel as the sole production target.**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment documentation.

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

**Note**: GitHub Pages is deprecated and no longer supported for this project.

## Project Structure

- `src/` - React components and application code
- `public/` - Static assets (images, videos)
- `dist/` - Build output (excluded from git)

## Technologies

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Analytics**: Vercel Analytics

## Development Notes

- Python scraping tools in repository are development-only utilities
- See `NON_ESSENTIAL_FILES_REPORT.md` for repository cleanup guidance

## License

See repository license file.
