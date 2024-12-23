import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthClient } from '../../store/authSlice';
import { RootState } from '../../store';
import styles from './Header.module.css';
import ApiDataSource from '../../apiContacts/apiDataSource';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tokens } from '../../types/types';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Greeting from './Greeting';
import ContactsInfo from './ContactsInfo';
import { handleAuthMessage, fetchAuthUrl } from '../../utils/authUtils';

const Header: React.FC = () => {
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalContacts, setTotalContacts] = useState<number | null>(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const tokens = useSelector((state: RootState) => state.auth.tokens) as Tokens;
  const userName = useSelector((state: RootState) => state.auth.userName);
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const backendPort = isMac ? import.meta.env.VITE_BACKEND_PORT_MAC : import.meta.env.VITE_BACKEND_PORT_WIN || 5000;

  useEffect(() => {
    console.log('Initial tokens:', tokens);

    const handleMessage = (event: MessageEvent) => handleAuthMessage(event, dispatch);

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch, tokens]);

  const handleLoginClick = async () => {
    try {
      const authUrl = await fetchAuthUrl(backendPort);
      window.open(authUrl, '_blank', 'width=500,height=600');
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
    setTotalContacts(null);
  };

  const apiDataSource = useMemo(() => {
    return tokens ? new ApiDataSource({
      access_token: tokens.access_token!,
      refresh_token: tokens.refresh_token!,
      scope: tokens.scope!,
      token_type: tokens.token_type!,
      expiry_date: tokens.expiry_date!
    }) : null;
  }, [tokens]);

  useEffect(() => {
    if (apiDataSource) {
      setLoading(true);
      apiDataSource.fetchContacts().then((contacts) => {
        console.log(`Total number of patients: ${contacts.length}`);
        setTotalContacts(contacts.length);
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
    }
  }, [apiDataSource]);

  return (
    <header className={styles.header}>
      <h1>Patient Manager</h1>
      <ToastContainer />
      {isLoggedIn && userName && (
        <>
          <Greeting userName={userName} />
          <div className={styles.contactsInfoContainer}>
            <ContactsInfo loading={loading} totalContacts={totalContacts} />
          </div>
        </>
      )}
      {!isLoggedIn && !showAuthInput && (
        <LoginButton onClick={handleLoginClick} />
      )}
      {isLoggedIn && (
        <LogoutButton onClick={handleLogoutClick} />
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