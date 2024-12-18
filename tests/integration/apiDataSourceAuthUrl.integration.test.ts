import dotenv from 'dotenv';
import path from 'path';
import { google } from 'googleapis';

jest.resetModules(); // Reset the module registry to avoid mock interference
// Unmock the googleapis module
jest.unmock('googleapis');
// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../auth/.env'), debug: process.env.DEBUG === 'true' });

describe('ApiDataSource Integration Tests - Generate Auth URL', () => {
  let oauth2Client: any;

  beforeAll(() => {
    // Ensure we are using the actual googleapis module
    const { OAuth2 } = google.auth;

    oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'urn:ietf:wg:oauth:2.0:oob'
    );
  });

  it('should generate the authorization URL', () => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    expect(authUrl).toContain('https://accounts.google.com/o/oauth2/v2/auth');
  });
});