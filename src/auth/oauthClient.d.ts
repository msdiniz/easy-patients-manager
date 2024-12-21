import { Auth } from 'googleapis';
declare const oauth2Client: Auth.OAuth2Client;
declare const generateAuthUrl: () => string;
declare const refreshAccessToken: (oauth2Client: Auth.OAuth2Client) => Promise<void>;
export { oauth2Client, generateAuthUrl, refreshAccessToken };
