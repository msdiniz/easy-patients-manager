import { google, Auth } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';

// Specify the path to the .env file
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath, debug: process.env.DEBUG === 'true' });
console.log('dotenv at OAuth:', envPath);

// Debugging log to check environment variables
console.log('OAuth Client Environment Variables:', process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  'urn:ietf:wg:oauth:2.0:oob'
);

const generateAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/contacts',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

const refreshAccessToken = async (oauth2Client: Auth.OAuth2Client) => {
  const refreshToken = oauth2Client.credentials.refresh_token;
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const refreshParams = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    grant_type: 'refresh_token'
  });

  try {
    const refreshResponse = await axios.post('https://oauth2.googleapis.com/token', refreshParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const newToken = refreshResponse.data;
    console.log('New token received:', newToken);
    oauth2Client.setCredentials(newToken);
    console.log('Successfully refreshed token!');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    } else {
      console.error('Error refreshing access token:', error);
    }
    throw error;
  }
};

export { oauth2Client, generateAuthUrl, refreshAccessToken };
