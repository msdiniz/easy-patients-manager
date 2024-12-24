import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthUser } from '../../store/authUserSlice';
import { RootState } from '../../store';
import styles from './Header.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectPhysician from './SelectPhysician';
import LoginUser from './LoginUser';
import Greeting from './Greeting';
import GoogleContacts from './GoogleContacts';

const Header: React.FC = () => {
  const [showAuthInput, setShowAuthInput] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.authUser.isLoggedIn);
  const userName = useSelector((state: RootState) => state.authUser.userName);
  const roles = useSelector((state: RootState) => state.authUser.roles);

  const handleLogoutClick = () => {
    dispatch(clearAuthUser());
    setShowAuthInput(true);
  };

  return (
    <header className={styles.header}>
      <h1>Patient Manager</h1>
      <ToastContainer />
      {isLoggedIn && userName && (
        <>
          <Greeting userName={userName} />
        </>
      )}
      {!isLoggedIn && showAuthInput && (
        <LoginUser onCancel={() => setShowAuthInput(false)} />
      )}
      {!isLoggedIn && !showAuthInput && (
        <button onClick={() => setShowAuthInput(true)}>Login</button>
      )}
      {isLoggedIn && (
        <button onClick={handleLogoutClick}>Logout</button>
      )}
      {isLoggedIn && (roles.includes('Clerk') || roles.includes('Supervisor')) && (
        <SelectPhysician />
      )}
      {isLoggedIn && roles.includes('Physician') && (
        <GoogleContacts />
      )}
    </header>
  );
};

export default Header;
