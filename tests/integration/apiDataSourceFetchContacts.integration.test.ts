import ApiDataSource from '../../src/apiContacts/apiDataSource';
import dotenv from 'dotenv';
import path from 'path';
import { oauth2Client } from '../../src/auth/oauthClient';
import axios from 'axios';
import { contactGroupIds } from '../../src/apiContacts/constants';
import { filterContactsByGroup, returnContactsThatDoNotBelongToPatientGroups } from '../../src/apiContacts/filterContacts';

jest.resetModules(); // Reset the module registry to avoid mock interference
// Unmock the googleapis module
jest.unmock('googleapis');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../src/auth/.env'), debug: process.env.DEBUG === 'true' });
// Load additional environment variables from .envAuthCode file
dotenv.config({ path: path.resolve(__dirname, '.envAuthCode'), debug: process.env.DEBUG === 'true' });

//before running the test, you need to get the auth code from the user
//visit below link to authorize the app and get the auth code:
//and paste it in .envAuthCode file:
// 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontacts%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=your-google-client-id&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob'     

describe('ApiDataSource Integration Tests - Fetch Contacts', () => {
  let apiDataSource: ApiDataSource;

  beforeAll(async () => {
    // Read the auth code from the .envAuthCode file
    const authCode = process.env.AUTH_CODE;
    if (!authCode) {
      throw new Error('No auth code found in .envAuthCode file');
    }
    console.log('Auth code:', authCode);
    // Exchange the auth code for tokens
    try {
      const { tokens } = await oauth2Client.getToken(authCode);
      oauth2Client.setCredentials({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope,
        token_type: tokens.token_type,
        expiry_date: tokens.expiry_date
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error: Invalid grant. The auth code may have been used already.');
        console.error('Try to generate another auth-code and paste it in .envAuthCode file');
        console.error('Visit this link to generate auth-code: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcontacts%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=your-google-client-id&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob'); 
        if (error.response) {
          console.error('Error.response.status:', error.response.status);
          console.error('Error.response:', error.response);
        }        
      } else {
        console.error('Error during initial authentication:', error);
      }
      throw error;
    }
    // Verify that the tokens are set correctly
    console.log('OAuth2 client credentials:', oauth2Client.credentials);

    // Pass the authenticated client to the ApiDataSource instance
    apiDataSource = new ApiDataSource(oauth2Client);
  }, 300000); // Increase the timeout to 5 minutes (300000 ms)

  it('should fetch all contacts in specified groups', async () => {
    try {
      const contacts = await apiDataSource.fetchContacts();
      const filteredContacts = filterContactsByGroup(contacts, contactGroupIds);
      console.log('Fetched contacts:', filteredContacts);
      expect(filteredContacts).toBeDefined();
      expect(filteredContacts.length).toBeGreaterThan(0);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        console.error('Error: Access token has expired. Refreshing token...');
        await refreshAccessToken(oauth2Client);
        const contacts = await apiDataSource.fetchContacts(); // Retry fetching contacts
        const filteredContacts = filterContactsByGroup(contacts, contactGroupIds);
        console.log('Fetched contacts after refresh:', filteredContacts);
        expect(filteredContacts).toBeDefined();
        expect(filteredContacts.length).toBeGreaterThan(0);
      } else {
        console.error('Error fetching contacts:', error);      
        if (isAxiosError(error) && error.response) {
          console.error('Error.response.status:', error.response.status);
          console.error('Error.response:', error.response);
          console.error('Error.response.data:', error.response.data);
        }  
        throw error;
      }
    }
  }, 300000); // Increase the timeout to 5 minutes (300000 ms)

  it('should fetch contacts that do not belong to patient groups', async () => {
    try {
      const contacts = await apiDataSource.fetchContacts();
      const filteredContacts = returnContactsThatDoNotBelongToPatientGroups(contacts);
      console.log('Fetched contacts:', filteredContacts);
      expect(filteredContacts).toBeDefined();
      expect(filteredContacts.length).toBeGreaterThan(0);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        console.error('Error: Access token has expired. Refreshing token...');
        await refreshAccessToken(oauth2Client);
        const contacts = await apiDataSource.fetchContacts(); // Retry fetching contacts
        const filteredContacts = returnContactsThatDoNotBelongToPatientGroups(contacts);
        console.log('Fetched contacts after refresh:', filteredContacts);
        expect(filteredContacts).toBeDefined();
        expect(filteredContacts.length).toBeGreaterThan(0);
      } else {
        console.error('Error fetching contacts:', error);
        throw error;
      }
    }
  }, 300000); // Increase the timeout to 5 minutes (300000 ms)

  it('should fetch a single contact', async () => {
    const contactId = 'people/c5059214960171316005'; // Marcelo Scofano Diniz
    try {
      const contact = await apiDataSource.fetchContact(contactId);
      console.log('Fetched contact:', contact);
      expect(contact).toBeDefined();
      if (contact) {
        expect(contact.resourceName).toEqual(contactId);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        console.error('Error: Access token has expired. Refreshing token...');
        await refreshAccessToken(oauth2Client);
        const contact = await apiDataSource.fetchContact(contactId); // Retry fetching contact
        console.log('Fetched contact after refresh:', contact);
        expect(contact).toBeDefined();
        if (contact) {
          expect(contact.resourceName).toEqual(contactId);
        }
      } else {
        console.error('Error fetching contact:', error);
        throw error;
      }
    }
  }, 300000); // Increase the timeout to 5 minutes (300000 ms)
});

// Not used now
// Function to get the auth code from the user
// async function getAuthCodeFromUser(): Promise<string> {
//   return new Promise((resolve) => {
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     rl.question('Enter the auth code from the URL: ', (authCode: string) => {
//       rl.close();
//       resolve(authCode);
//     });
//   });
// }

// Type guard to check if the error is an AxiosError
function isAxiosError(error: any): error is import('axios').AxiosError {
  return error.isAxiosError === true;
}

// Function to refresh the access token
async function refreshAccessToken(oauth2Client: import('google-auth-library').OAuth2Client) {
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
    if (isAxiosError(error)) {
      console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    } else {
      console.error('Error refreshing access token:', error);
    }
    throw error;
  }
}
