import ApiDataSource from '../../apiContacts/apiDataSource';
import dotenv from 'dotenv';
import path from 'path';
import { google } from 'googleapis';

jest.resetModules(); // Reset the module registry to avoid mock interference
// Unmock the googleapis module
jest.unmock('googleapis');
// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env'), debug: process.env.DEBUG === 'true' });

describe('ApiDataSource Integration Tests - Fetch Contacts', () => {
  let apiDataSource: ApiDataSource;
  let oauth2Client: any;

  beforeAll(async () => {
    // Ensure we are using the actual googleapis module
    const { OAuth2 } = google.auth;

    oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'urn:ietf:wg:oauth:2.0:oob'
    );

    // Load tokens from .env file
    const tokens = {
      access_token: process.env.ACCESS_TOKEN,
      refresh_token: process.env.REFRESH_TOKEN,
      scope: 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/userinfo.profile',
      token_type: 'Bearer',
      id_token: process.env.ID_TOKEN,
      expiry_date: parseInt(process.env.EXPIRY_DATE || '0', 10)
    };

    oauth2Client.setCredentials(tokens);

    // Verify that the tokens are set correctly
    console.log('OAuth2 client credentials:', oauth2Client.credentials);

    apiDataSource = new ApiDataSource();
  }, 300000); // Increase the timeout to 5 minutes (300000 ms)

  it('should fetch all contacts', async () => {
    try {
      const contacts = await apiDataSource.fetchContacts();
      console.log('Fetched contacts:', contacts);
      expect(contacts).toBeDefined();
      expect(contacts.length).toBeGreaterThan(0);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        console.error('Error: Access token has expired. Please run the apiDataSourceAuthUrl.integration.test.ts to generate a new token.');
      } else {
        console.error('Error fetching contacts:', error);
      }
      throw error;
    }
  });

  it('should fetch a single contact', async () => {
    const contactId = 'people/c7358803509038311667'; // Replace with a valid contact ID
    try {
      const contact = await apiDataSource.fetchContact(contactId);
      console.log('Fetched contact:', contact);
      expect(contact).toBeDefined();
      if (contact) {
        expect(contact.resourceName).toEqual(contactId);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        console.error('Error: Access token has expired. Please run the apiDataSourceAuthUrl.integration.test.ts to generate a new token.');
      } else {
        console.error('Error fetching contact:', error);
      }
      throw error;
    }
  });
});

// Type guard to check if the error is an AxiosError
function isAxiosError(error: any): error is import('axios').AxiosError {
  return error.isAxiosError === true;
}

// const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout,
    // });

    // const code = await new Promise<string>((resolve) => {
    //   rl.question('Enter the authorization code from the URL: ', (answer) => {
    //     rl.close();
    //     resolve(answer);
    //   });
    // });
