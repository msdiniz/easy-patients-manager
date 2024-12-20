import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { OAuth2Client } from 'google-auth-library';
import { oauth2Client, generateAuthUrl } from '../auth/oauthClient';
import { setAuthClient, clearAuthClient } from '../store/authSlice';
import { RootState } from '../store';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [authCode, setAuthCode] = useState('');
  const [showAuthInput, setShowAuthInput] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    console.log('Header component mounted');
    // Initialize Google Auth and dispatch to Redux store
    // ...
  }, [dispatch]);

  const handleLoginClick = () => {
    const authUrl = generateAuthUrl();
    window.open(authUrl, '_blank');
    setShowAuthInput(true);
  };

  const handleLogoutClick = () => {
    dispatch(clearAuthClient());
    setShowAuthInput(false);
    setAuthCode('');
  };

  const handleAuthCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
  };

  const handleSendClick = async () => {
    if (authCode) {
      try {
        const { tokens } = await oauth2Client.getToken(authCode);
        oauth2Client.setCredentials(tokens);
        dispatch(setAuthClient(oauth2Client));
        setShowAuthInput(false);
        setAuthCode('');
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    }
  };

  const handleCancelClick = () => {
    setShowAuthInput(false);
    setAuthCode('');
  };

  return (
    <header className={styles.header}>
      <h1>Patient Manager</h1>
      {!isLoggedIn && !showAuthInput && (
        <button onClick={handleLoginClick}>Login</button>
      )}
      {isLoggedIn && (
        <button onClick={handleLogoutClick}>Logout</button>
      )}
      {showAuthInput && (
        <div className={styles.authContainer}>
          <input
            type="text"
            value={authCode}
            onChange={handleAuthCodeChange}
            placeholder="Enter auth code"
          />
          <button onClick={handleSendClick} disabled={!authCode}>
            Send
          </button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </header>
  );
};

export default Header;
