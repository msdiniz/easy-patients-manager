import { google, Auth } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';

// Specify the path to the .env file
const envPath = path.resolve(__dirname, '../auth/.env');
dotenv.config({ path: envPath, debug: process.env.DEBUG === 'true' });
console.log('dotenv at OAuth:', envPath);

// Debugging log to check environment variables
console.log('OAuth Client Environment Variables:', process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  'urn:ietf:wg:oauth:2.0:oob'
);

export default oauth2Client;