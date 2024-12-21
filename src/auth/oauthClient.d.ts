import { Auth } from 'googleapis';
declare const oauth2Client: Auth.OAuth2Client;
declare const generateAuthUrl: () => string;
export { oauth2Client, generateAuthUrl };
