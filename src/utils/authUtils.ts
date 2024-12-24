import { Tokens } from '../types/types';
import { setAuthClient } from '../store/authSlice';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import users from '../../data/staff/users.json';
import CryptoJS from 'crypto-js';

export const handleAuthMessage = (event: MessageEvent, dispatch: Dispatch<any>) => {
  console.log('Received message event:', event);
  const data = event.data;
  console.log('Event data:', data);
  if (data.source && data.source.startsWith('react-devtools')) return; // Ignore messages from React DevTools
  if (data && typeof data === 'object') {
    const hasRequiredFields = 'access_token' in data && 'scope' in data && 'token_type' in data && 'expiry_date' in data;
    console.log('Has required fields:', hasRequiredFields);
    if (hasRequiredFields) {
      const tokens = data as Tokens;
      console.log('Received tokens:', tokens);

      // Fetch user info to get the user's name
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((userInfo) => {
          const userName = userInfo.name;
          console.log('Fetched user info:', userInfo);
          console.log('Dispatching setAuthClient with tokens and userName');
          dispatch(setAuthClient({ tokens, userName }));
          console.log('Dispatched setAuthClient with tokens and userName');
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          toast.error('Error fetching user info');
        });
    } else {
      console.error('Invalid tokens received:', data);
      toast.error('Invalid tokens received');
    }
  }
};

export const fetchAuthUrl = async (backendPort: number) => {
  console.log('Backend port:', backendPort);
  console.log('Environmental variable MAC:', import.meta.env.VITE_BACKEND_PORT_MAC);
  console.log('Environmental variable: WIN:', import.meta.env.VITE_BACKEND_PORT_WIN);
  const response = await fetch(`https://localhost:${backendPort}/auth-url`);
  if (!response.ok) {
    if (response.status >= 500 && response.status < 600) {
      throw new Error(`Server error: ${response.status}`);
    } else {
      throw new Error(`Client error: ${response.status}`);
    }
  }
  const data = await response.json();
  console.log('Auth URL data:', data);
  return data.url;
};

const defaultPassword = '1234';

export const authenticateUser = async (email: string, password: string) => {
  const user = users.find(user => user.emails.includes(email));
  if (user) {
    if (!user.password) {
      // First login, set the default password
      const hashedPassword = CryptoJS.SHA256(defaultPassword).toString();
      user.password = hashedPassword;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    if (hashedPassword === user.password) {
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  } else {
    throw new Error('Invalid email or password');
  }
};
