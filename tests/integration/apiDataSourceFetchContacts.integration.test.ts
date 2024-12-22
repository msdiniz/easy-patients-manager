import axios from 'axios';
import { Tokens } from '../src/types';

describe('API Data Source Integration Tests', () => {
  let tokens: Tokens;

  beforeAll(async () => {
    // Obtain tokens from the backend
    const response = await axios.get('http://localhost:5000/auth-url');
    const authUrl = response.data.url;

    // Simulate user login and obtain tokens
    // This part may require manual intervention or a headless browser for automation
    // For simplicity, assume tokens are obtained and set here
    tokens = {
      access_token: 'your-access-token',
      refresh_token: 'your-refresh-token',
      scope: 'your-scope',
      token_type: 'Bearer',
      expiry_date: Date.now() + 3600 * 1000,
    };
  });

  it('should fetch contacts', async () => {
    const response = await axios.get('http://localhost:5000/contacts', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
  });
});