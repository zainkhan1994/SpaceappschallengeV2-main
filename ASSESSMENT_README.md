# Hackathon Archetype Assessment Feature

## Overview

The Assessment feature allows users to take a personality assessment to determine their hackathon archetype. This helps participants understand their strengths and find suitable team roles.

## Features

- **5 Multiple Choice Questions**: Engaging questions about hackathon preferences and working styles
- **5 Archetype Types**: Leader, Builder, Designer, Coder, and Researcher
- **Results Tracking**: Assessment results are saved to a JSON file on the backend
- **Statistics Endpoint**: Organizers can review aggregate statistics about submissions
- **Clean UI**: Consistent with the existing design system

## Architecture

### Frontend Components

**Location**: `src/components/Assessment.tsx`

The Assessment component is a React component that:
- Displays questions one at a time with progress tracking
- Calculates archetype based on most frequent answer type
- Allows users to navigate back and forth between questions
- Displays results with personalized descriptions and traits
- Submits results to the backend API

### Backend Server

**Location**: `server.js`

A Node.js/Express server that:
- Serves the built React application
- Provides API endpoints for saving and retrieving assessment results
- Stores data in `/data/assessment-results.json`

### Routing

**Location**: `src/main.tsx`

React Router is used to provide client-side routing:
- `/` - Main landing page
- `/assessment` - Assessment page

## Accessing the Assessment

Users can access the assessment via:
1. **Navigation Link**: Click "Assessment" in the header navigation
2. **Direct URL**: Navigate to `/assessment`

## Modifying Questions and Archetypes

### Adding/Editing Questions

Edit the `questions` array in `src/components/Assessment.tsx`:

```typescript
const questions = [
  {
    id: 1,
    question: 'Your question text here?',
    options: [
      { text: 'Option 1', archetype: 'Leader' },
      { text: 'Option 2', archetype: 'Builder' },
      { text: 'Option 3', archetype: 'Designer' },
      { text: 'Option 4', archetype: 'Coder' },
      { text: 'Option 5', archetype: 'Researcher' }
    ]
  },
  // Add more questions...
];
```

### Adding/Editing Archetypes

Edit the `archetypes` object in `src/components/Assessment.tsx`:

```typescript
const archetypes = {
  Leader: {
    title: 'The Leader',
    emoji: '👑',
    description: 'Your description here...',
    traits: ['Trait 1', 'Trait 2', 'Trait 3', 'Trait 4']
  },
  // Add more archetypes...
};
```

## API Endpoints

### POST /api/assessment

Save a new assessment submission.

**Request Body**:
```json
{
  "email": "user@example.com",
  "archetype": "Coder",
  "answers": {
    "1": "Coder",
    "2": "Coder",
    "3": "Coder",
    "4": "Coder",
    "5": "Coder"
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Assessment results saved successfully",
  "id": 1
}
```

### GET /api/assessment/stats

Retrieve statistics about all submissions.

**Response**:
```json
{
  "total": 10,
  "archetypes": {
    "Coder": 4,
    "Designer": 3,
    "Leader": 2,
    "Researcher": 1
  },
  "recentSubmissions": [...]
}
```

## Running the Application

### Development Mode (Frontend Only)

```bash
npm run dev
```

This starts the Vite development server on http://localhost:5173

**Note**: Backend API calls will fail in dev mode. To test the full functionality, use production mode.

### Production Mode (Frontend + Backend)

```bash
# Build the frontend
npm run build

# Start the backend server
npm start
```

The server runs on http://localhost:3000 and serves both the API and built React app.

## Data Storage

Assessment results are stored in `/data/assessment-results.json`.

### Example Data Structure

```json
[
  {
    "id": 1,
    "email": "test@example.com",
    "archetype": "Coder",
    "answers": {
      "1": "Coder",
      "2": "Coder",
      "3": "Coder",
      "4": "Coder",
      "5": "Coder"
    },
    "timestamp": "2025-01-15T10:30:00.000Z",
    "submittedAt": "2025-01-15T10:30:05.123Z"
  }
]
```

### Reviewing Results

1. **Direct File Access**: Open `/data/assessment-results.json` in a text editor
2. **API Statistics**: Visit `http://localhost:3000/api/assessment/stats` in a browser
3. **Command Line**: Use `jq` or similar tools to parse the JSON

Example:
```bash
# View all results
cat data/assessment-results.json | jq .

# Count by archetype
cat data/assessment-results.json | jq 'group_by(.archetype) | map({archetype: .[0].archetype, count: length})'
```

## Privacy & Data Handling

- Email is optional - users can submit without providing an email
- The assessment-results.json file is added to `.gitignore` to protect participant privacy
- No personal identifying information is collected beyond optional email
- All data is stored locally on the server

## Sharing the Assessment

Share the assessment link with participants:

**Development**: http://localhost:5173/assessment
**Production**: https://yourdomain.com/assessment

You can also embed this in:
- Event registration emails
- Social media posts
- Team formation guides
- Event welcome packets

## Customization Tips

1. **Change Number of Questions**: Simply add or remove questions from the array
2. **Add New Archetypes**: Add new archetype objects and update question options
3. **Modify UI Colors**: Update Tailwind classes in the component
4. **Add Validation**: Extend the form validation logic in the submit handler
5. **Export Data**: Add a new API endpoint to export results as CSV

## Troubleshooting

### Assessment page shows blank screen
- Check browser console for errors
- Ensure React Router is properly configured in `main.tsx`

### Results not saving
- Verify backend server is running (`npm start`)
- Check `/data` directory exists and is writable
- Review server logs for error messages

### API endpoint returns 404
- Ensure you're accessing via the backend server (port 3000), not Vite dev server (port 5173)
- Check server.js for correct endpoint paths

## Future Enhancements

Potential improvements for future iterations:

- Email confirmation after submission
- Results analytics dashboard for organizers
- Share results on social media
- Team matching based on archetypes
- Multiple language support
- Export results as PDF certificate
- Question branching logic for more personalized results

## Support

For questions or issues with the assessment feature, contact:
- Technical Lead: [your-email@example.com]
- Repository Issues: [GitHub Issues Link]
