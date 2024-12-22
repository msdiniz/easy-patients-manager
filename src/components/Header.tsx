import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthClient, clearAuthClient } from '../store/authSlice';
import { RootState } from '../store';
import styles from './Header.module.css';
import ApiDataSource from '../apiContacts/apiDataSource';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tokens } from '../types/types';

const Header: React.FC = () => {
  const [showAuthInput, setShowAuthInput] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const tokens = useSelector((state: RootState) => state.auth.tokens) as Tokens;
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const backendPort = isMac ? import.meta.env.VITE_BACKEND_PORT_MAC : import.meta.env.VITE_BACKEND_PORT_WIN || 5000;

  useEffect(() => {
    console.log('Initial tokens:', tokens);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (data.source && data.source.startsWith('react-devtools')) return; // Ignore messages from React DevTools
      if (data && typeof data === 'object' && 'access_token' in data && 'refresh_token' in data && 'scope' in data && 'token_type' in data && 'expiry_date' in data) {
        const tokens = data as Tokens;
        console.log('Received tokens:', tokens);
        dispatch(setAuthClient(tokens));
        setShowAuthInput(false);
      } else {
        console.error('Invalid tokens received:', data);
        toast.error('Invalid tokens received');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  const handleLoginClick = async () => {
    try {
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
      window.open(data.url, '_blank', 'width=500,height=600');
    } catch (error: any) {
      if (error.message.startsWith('Server error')) {
        toast.error(`Cannot reach server at port ${backendPort}. Please try again later.`);
      } else if (error.message.startsWith('Client error')) {
        toast.error(`Client error occurred: ${error.message}`);
      } else {
        toast.error(`An unexpected error occurred: ${error.message}`);
      }
    }
  };

  const handleLogoutClick = () => {
    dispatch(clearAuthClient());
    setShowAuthInput(true);
  };

  const apiDataSource = tokens ? new ApiDataSource({
    access_token: tokens.access_token!,
    refresh_token: tokens.refresh_token!,
    scope: tokens.scope!,
    token_type: tokens.token_type!,
    expiry_date: tokens.expiry_date!
  }) : null;

  return (
    <header className={styles.header}>
      <h1>Patient Manager</h1>
      <ToastContainer />
      {!isLoggedIn && !showAuthInput && (
        <button onClick={handleLoginClick}>Login</button>
      )}
      {isLoggedIn && (
        <button onClick={handleLogoutClick}>Logout</button>
      )}
      {apiDataSource && (
        <div>
          {/* Use apiDataSource to fetch and display data */}
        </div>
      )}
    </header>
  );
};

export default Header;
