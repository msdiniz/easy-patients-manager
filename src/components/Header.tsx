import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gapi } from 'gapi-script';
import { setAuthClient, clearAuthClient } from '../store/authSlice';
import { setApiDataSource, clearApiDataSource } from '../store/apiDataSourceSlice';
import { RootState } from '../store';
import styles from './Header.module.css';
import ApiDataSource from '../apiContacts/apiDataSource'; // Correct import

const Header: React.FC = () => {
  const [showAuthInput, setShowAuthInput] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/userinfo.profile',
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const handleLoginClick = () => {
    gapi.auth2.getAuthInstance().signIn().then((user: gapi.auth2.GoogleUser) => { // Add type annotation
      dispatch(setAuthClient(user));
      const apiDataSource = new ApiDataSource(user);
      dispatch(setApiDataSource(apiDataSource));
      setShowAuthInput(false);
    });
  };

  const handleLogoutClick = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      dispatch(clearAuthClient());
      dispatch(clearApiDataSource());
      setShowAuthInput(false);
    });
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
    </header>
  );
};

export default Header;
