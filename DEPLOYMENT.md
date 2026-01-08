# Deployment Guide

## Production Deployment

**Vercel is the only production deployment target for this project.**

### Vercel Configuration

This project is configured to deploy to Vercel with the following settings:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Node Version**: 18.x or later

### Automatic Deployments

- **Production**: Automatic deployments occur on pushes to the `main` branch
- **Preview**: Preview deployments are created for pull requests (optional)

### Manual Deployment

To deploy manually using the Vercel CLI:

```bash
npm install -g vercel
vercel --prod
```

### Environment Variables

If needed, configure environment variables in the Vercel dashboard:
- Navigate to Project Settings → Environment Variables
- Add any required API keys or configuration values

## Deprecated Deployment Methods

### GitHub Pages (DEPRECATED)

**GitHub Pages is no longer supported as a deployment target for this project.**

Reasons for deprecation:
- Vercel provides better performance with edge network CDN
- Automatic deployments with better CI/CD integration
- Built-in analytics via `@vercel/analytics`
- Better support for SPAs with client-side routing
- No need for build artifact commits or gh-pages branch management

If you encounter references to GitHub Pages in legacy documentation or configurations, they should be disregarded.

## Build Verification

Before deploying, always verify the build locally:

```bash
npm install
npm run build
npm run preview
```

The build output will be in the `dist/` directory, which is excluded from version control via `.gitignore`.

## Analytics

This project uses Vercel Analytics (`@vercel/analytics` package) for monitoring production performance and usage metrics.

## Support

For deployment issues, consult:
- [Vercel Documentation](https://vercel.com/docs)
- Project maintainers
