import express, { Request, Response } from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
);

app.get('/auth-url', (_req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/contacts',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
  res.send({ url: authUrl });
});

app.get('/oauth2callback', async (req: Request, res: Response) => {
  const { code } = req.query;
  if (typeof code === 'string') {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.redirect(`http://localhost:3000?tokens=${JSON.stringify(tokens)}`);
  } else {
    res.status(400).send('Invalid code');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});