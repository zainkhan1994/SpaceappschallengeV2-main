# Deployment Guide for Assessment Feature

## Quick Start

### Prerequisites
- Node.js v18+ installed
- npm installed
- Git repository cloned

### Installation

```bash
# Install dependencies (skip puppeteer download if needed)
PUPPETEER_SKIP_DOWNLOAD=true npm install

# Or just
npm install
```

## Development

### Run Frontend Only (No Backend API)

```bash
npm run dev
```
- Opens at http://localhost:5173
- Hot reload enabled
- Assessment submission will fail (no backend)

### Run Full Stack (Frontend + Backend)

```bash
# Terminal 1: Build frontend
npm run build

# Terminal 2: Start backend server
npm start
```
- Opens at http://localhost:3000
- Serves static files + API
- Full assessment functionality

## Production Deployment

### Option 1: Single Server (Recommended for Small Scale)

```bash
# Build the frontend
npm run build

# Start the backend server
npm start

# Or use PM2 for production
npm install -g pm2
pm2 start server.js --name "space-apps-server"
pm2 save
pm2 startup
```

### Option 2: Separate Frontend/Backend

**Frontend (Static Hosting - Vercel, Netlify, etc.)**
```bash
npm run build
# Deploy dist/ directory
```

**Backend (Node Server - Heroku, DigitalOcean, etc.)**
```bash
# Deploy server.js
# Set environment variable PORT if needed
# Ensure data/ directory is writable
```

**Important**: Update API endpoints in `src/components/Assessment.tsx` if using separate hosting:

```typescript
// Change from:
const response = await fetch('/api/assessment', { ... });

// To:
const response = await fetch('https://your-backend-domain.com/api/assessment', { ... });
```

### Option 3: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t space-apps-assessment .
docker run -p 3000:3000 -v $(pwd)/data:/app/data space-apps-assessment
```

## Environment Variables

Create a `.env` file (optional):

```bash
# Server port (default: 3000)
PORT=3000

# Node environment
NODE_ENV=production
```

## File Permissions

Ensure the data directory is writable:

```bash
mkdir -p data
chmod 755 data
```

## Monitoring & Maintenance

### Check Assessment Stats

```bash
# Via API
curl http://localhost:3000/api/assessment/stats

# Via file
cat data/assessment-results.json | jq .
```

### Backup Data

```bash
# Regular backups
cp data/assessment-results.json data/assessment-results-backup-$(date +%Y%m%d).json

# Or setup cron job
0 0 * * * cp /path/to/data/assessment-results.json /path/to/backups/assessment-results-$(date +\%Y\%m\%d).json
```

### Log Monitoring

The server logs to console. In production, redirect to a file:

```bash
npm start > logs/server.log 2>&1 &

# Or with PM2
pm2 start server.js --log logs/server.log
```

## Security Considerations

1. **Data Privacy**: assessment-results.json contains email addresses
   - Keep file permissions restrictive (600 or 640)
   - Don't commit to git (already in .gitignore)
   - Consider encryption for sensitive deployments

2. **API Rate Limiting**: Add rate limiting to prevent abuse
   ```bash
   npm install express-rate-limit
   ```

3. **HTTPS**: Always use HTTPS in production
   - Let's Encrypt for free SSL certificates
   - Or use platform SSL (Heroku, Vercel, etc.)

4. **CORS**: Configure CORS if frontend/backend are on different domains
   ```javascript
   // In server.js
   const cors = require('cors');
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

### Data Not Saving
```bash
# Check directory permissions
ls -la data/

# Check server logs
pm2 logs space-apps-server

# Verify directory exists
mkdir -p data
```

### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## Scaling Considerations

For high traffic:

1. **Database**: Migrate from JSON file to PostgreSQL/MongoDB
2. **Load Balancing**: Use Nginx or AWS ALB
3. **CDN**: Serve static files via CloudFront/Cloudflare
4. **Caching**: Add Redis for API caching
5. **Monitoring**: Setup New Relic, DataDog, or similar

## Support

For deployment issues:
1. Check server logs
2. Verify all dependencies installed
3. Ensure data directory is writable
4. Review ASSESSMENT_README.md for feature details

## Health Check Endpoint

Add this to `server.js` for monitoring:

```javascript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});
```

Then monitor:
```bash
curl http://localhost:3000/health
```

## Useful Commands

```bash
# Development
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm start            # Run backend server
npm run lint         # Lint code

# Production
pm2 start server.js  # Start with PM2
pm2 stop server.js   # Stop server
pm2 restart server.js # Restart server
pm2 logs             # View logs
pm2 monit            # Monitor resources

# Maintenance
npm audit            # Check for vulnerabilities
npm audit fix        # Fix vulnerabilities
npm update           # Update dependencies
```
