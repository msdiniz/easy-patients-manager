import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthClient, clearAuthClient } from '../store/authSlice';
import { setApiDataSource, clearApiDataSource } from '../store/apiDataSourceSlice';
import { RootState } from '../store';
import styles from './Header.module.css';
import ApiDataSource from '../apiContacts/apiDataSource';

const Header: React.FC = () => {
  const [showAuthInput, setShowAuthInput] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokens = urlParams.get('tokens');
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      dispatch(setAuthClient(parsedTokens));
      const apiDataSource = new ApiDataSource(parsedTokens);
      dispatch(setApiDataSource(apiDataSource));
      setShowAuthInput(false);
    }
  }, [dispatch]);

  const handleLoginClick = async () => {
    const response = await fetch('http://localhost:5000/auth-url');
    const data = await response.json();
    window.location.href = data.url;
  };

  const handleLogoutClick = () => {
    dispatch(clearAuthClient());
    dispatch(clearApiDataSource());
    setShowAuthInput(true);
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
