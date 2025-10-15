// DEBUG: Only print the sheet ID for clarity
import 'dotenv/config';

import { google } from 'googleapis';

const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function testWrite() {
  const client = await auth.getClient();
  const date = new Date().toISOString();
  const range = 'Sheet1';
  console.log('Using Sheet ID:', SHEET_ID);
  console.log('Using range:', range);
  const response = await sheets.spreadsheets.values.append({
  auth: client,
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[date, 'API test row', 'This is a test from Copilot', '', '', '', '']],
    },
  });
  console.log('API response:', JSON.stringify(response.data, null, 2));
  console.log('Test row written to Google Sheets!');
}

console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID);

testWrite().catch(console.error);
