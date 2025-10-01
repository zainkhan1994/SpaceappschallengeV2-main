/**
 * Simple Express server for the Space Apps Challenge website
 * 
 * This server handles:
 * 1. Serving the built Vite/React application
 * 2. Saving assessment results to a JSON file
 * 
 * To run: node server.js
 * The server will run on port 3000 (or PORT environment variable)
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Path to store assessment results
const DATA_DIR = path.join(__dirname, 'data');
const RESULTS_FILE = path.join(DATA_DIR, 'assessment-results.json');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory (built React app)
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * API ENDPOINT: Save Assessment Results
 * 
 * POST /api/assessment
 * Body: {
 *   email: string,
 *   archetype: string,
 *   answers: object,
 *   timestamp: string
 * }
 * 
 * Saves the assessment results to data/assessment-results.json
 * Each submission is appended to an array of results
 */
app.post('/api/assessment', (req, res) => {
  try {
    const { email, archetype, answers, timestamp } = req.body;

    // Validate required fields
    if (!archetype || !answers || !timestamp) {
      return res.status(400).json({ 
        error: 'Missing required fields: archetype, answers, and timestamp are required' 
      });
    }

    // Create data directory if it doesn't exist
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Read existing results or create empty array
    let results = [];
    if (fs.existsSync(RESULTS_FILE)) {
      const fileContent = fs.readFileSync(RESULTS_FILE, 'utf8');
      if (fileContent.trim()) {
        results = JSON.parse(fileContent);
      }
    }

    // Add new result
    const newResult = {
      id: results.length + 1,
      email: email || 'anonymous',
      archetype,
      answers,
      timestamp,
      submittedAt: new Date().toISOString()
    };

    results.push(newResult);

    // Save to file with pretty formatting for easy reading
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));

    console.log(`Assessment saved: ${archetype} (Total: ${results.length})`);

    res.json({ 
      success: true, 
      message: 'Assessment results saved successfully',
      id: newResult.id
    });

  } catch (error) {
    console.error('Error saving assessment:', error);
    res.status(500).json({ 
      error: 'Failed to save assessment results',
      details: error.message 
    });
  }
});

/**
 * API ENDPOINT: Get Assessment Results Summary
 * 
 * GET /api/assessment/stats
 * 
 * Returns statistics about all assessment submissions
 * Useful for organizers to review results
 */
app.get('/api/assessment/stats', (req, res) => {
  try {
    if (!fs.existsSync(RESULTS_FILE)) {
      return res.json({ 
        total: 0, 
        archetypes: {},
        message: 'No submissions yet' 
      });
    }

    const fileContent = fs.readFileSync(RESULTS_FILE, 'utf8');
    const results = fileContent.trim() ? JSON.parse(fileContent) : [];

    // Calculate statistics
    const stats = {
      total: results.length,
      archetypes: {},
      recentSubmissions: results.slice(-5).reverse() // Last 5 submissions
    };

    // Count each archetype
    results.forEach(result => {
      const archetype = result.archetype;
      stats.archetypes[archetype] = (stats.archetypes[archetype] || 0) + 1;
    });

    res.json(stats);

  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve statistics',
      details: error.message 
    });
  }
});

// Serve React app for all other routes (client-side routing)
// Using regex to match all routes except API routes
app.get(/^(?!\/api\/).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Assessment results will be saved to: ${RESULTS_FILE}`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  POST /api/assessment - Save assessment results`);
  console.log(`  GET  /api/assessment/stats - View submission statistics\n`);
});
