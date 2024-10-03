import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
const fs = require('fs');
const path = require('path');

// Load your Google Service Account credentials (replace with your credentials)
const GOOGLE_SHEET_ID = '1MkMsqsGx56sH6lfUQ_Q2H07RCOVKLco6GXqlA2DRC14'; // Google Sheet ID
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Function to load and parse the JSON content
const loadCredentials = () => {
  try {
    // Read the file content
    const jsonData = fs.readFileSync(path.resolve(credentialsPath), 'utf8');
    
    // Parse the JSON data into an object
    const GOOGLE_CREDENTIALS = JSON.parse(jsonData);
    
    return GOOGLE_CREDENTIALS;
  } catch (error) {
    console.error('Error reading or parsing credentials file:', error);
    return null;
  }
};
// if (!credentials) {
//   throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable not set.');
// }

// const GOOGLE_CREDENTIALS = JSON.parse(credentials);

// Function to write data to Google Sheets
const GOOGLE_CREDENTIALS = loadCredentials();
async function writeToSheet(data: string[]) {
  const auth = new GoogleAuth({
    credentials: GOOGLE_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  
  const request = {
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'A:I', // Update based on your sheet range
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [data],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`Data added to Google Sheet: ${response.data.updates}`);
    return response.data;
  } catch (error) {
    console.error('Error writing to Google Sheets', error);
    // console.log("error")
    throw new Error('Failed to write to Google Sheets');
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
    const { OwnerName, Phone, activityName, startDate, endDate, time, location, prizes, additionalInfo } = body;

  try {
    // Prepare the data for the sheet
    const rowData = [OwnerName, Phone, activityName, startDate, endDate, time, location, prizes, additionalInfo];
    
    // Write data to Google Sheet
    console.log(rowData); // Check if the data is populated as expected

    const result = await writeToSheet(rowData);

    return new Response(JSON.stringify({ message: 'Data written to Google Sheets successfully', result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to write data to Google Sheets', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
}}
