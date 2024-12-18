import ApiDataSource from '../../apiContacts/apiDataSource';
import readline from 'readline';
import dotenv from 'dotenv';
import path from 'path';

jest.resetModules(); // Reset the module registry to avoid mock interference

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../auth/.env'), debug: process.env.DEBUG === 'true' });

describe('ApiDataSource Integration Tests', () => {
  let apiDataSource: ApiDataSource;
  let oauth2Client: any;

  beforeAll(async () => {
    // Ensure we are using the actual googleapis module
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { OAuth2 } = require(require.resolve('googleapis')).aut
    oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'urn:ietf:wg:oauth:2.0:oob'
    );

    console.log('ApiDataSource Integration Tests:');
    console.log('oauth2Client:', oauth2Client);
    console.log('oauth2Client.generateAuthUrl:', oauth2Client.generateAuthUrl);

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/contacts',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });

    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const code = await new Promise<string>((resolve) => {
      rl.question('Enter the authorization code from the URL: ', (answer) => {
        rl.close();
        resolve(answer);
      });
    });

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    apiDataSource = new ApiDataSource();
  });

  it('should fetch all contacts', async () => {
    const contacts = await apiDataSource.fetchContacts();
    console.log('Fetched contacts:', contacts);
    expect(contacts).toBeDefined();
    expect(contacts.length).toBeGreaterThan(0);
  });

  it('should fetch a single contact', async () => {
    const contactId = 'people/1'; // Replace with a valid contact ID
    const contact = await apiDataSource.fetchContact(contactId);
    console.log('Fetched contact:', contact);
    expect(contact).toBeDefined();
    if (contact) {
      expect(contact.resourceName).toEqual(contactId);
    }
  });
});
