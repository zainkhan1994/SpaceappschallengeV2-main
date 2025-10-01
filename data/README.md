# Assessment Results Data

This directory stores assessment results from the hackathon archetype assessment.

## Files

- **assessment-results.json** - Contains all assessment submissions. This file is automatically created when the first assessment is submitted.

## Data Structure

Each assessment result includes:
```json
{
  "id": 1,
  "email": "user@example.com",
  "archetype": "Coder",
  "answers": {
    "1": "Coder",
    "2": "Coder",
    ...
  },
  "timestamp": "2025-01-15T10:30:00.000Z",
  "submittedAt": "2025-01-15T10:30:05.123Z"
}
```

## Reviewing Results

You can review assessment results in several ways:

1. **Direct File Access**: Open `assessment-results.json` in any text editor
2. **API Statistics**: Visit `/api/assessment/stats` endpoint to see summary statistics
3. **Command Line**: Use `jq` or similar tools to parse the JSON file

Example statistics query:
```bash
curl http://localhost:3000/api/assessment/stats
```

## Privacy Note

The assessment-results.json file is added to .gitignore to protect participant privacy. Make sure to handle this data responsibly and in accordance with your privacy policy.
