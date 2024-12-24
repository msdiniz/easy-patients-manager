import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthUser } from '../../store/authUserSlice';
import { setPatientsGoogle } from '../../store/patientSlice';
import { RootState } from '../../store';
import styles from './Header.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectPhysician from './SelectPhysician';
import LoginUser from './LoginUser';
import Greeting from './Greeting';
import GoogleContacts from './GoogleContacts';
import ContactsInfo from './ContactsInfo';
import { fetchContacts } from '../../utils/contactUtils';
import { transformContactsToPatients } from '../../utils/transformPatient';
import { Tokens } from '../../types/types';

interface HeaderProps {
  onPhysicianSelected: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPhysicianSelected }) => {
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalContacts, setTotalContacts] = useState<number | null>(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.authUser.isLoggedIn);
  const userName = useSelector((state: RootState) => state.authUser.userName);
  const roles = useSelector((state: RootState) => state.authUser.roles);
  const tokens = useSelector((state: RootState) => state.auth.tokens) as Tokens;

  const handleLogoutClick = () => {
    dispatch(clearAuthUser());
    setShowAuthInput(true);
  };

  useEffect(() => {
    if (isLoggedIn && roles.includes('Physician') && tokens && tokens.access_token) {
      setLoading(true);
      fetchContacts(tokens as Tokens).then((contacts) => {
        console.log(`Total number of contacts: ${contacts.length}`);
        setTotalContacts(contacts.length);
        const patients = transformContactsToPatients(contacts);
        dispatch(setPatientsGoogle(patients));
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
    }
  }, [isLoggedIn, roles, tokens, dispatch]);

  return (
    <header className={styles.header}>
      <h1>Patient Manager</h1>
      <ToastContainer />
      {isLoggedIn && userName && (
        <>
          <Greeting userName={userName} />
          <ContactsInfo loading={loading} totalContacts={totalContacts} />
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
      {isLoggedIn && roles.includes('Clerk') && (
        <SelectPhysician onPhysicianSelected={onPhysicianSelected} />
      )}
      {isLoggedIn && roles.includes('Supervisor') && (
        <SelectPhysician onPhysicianSelected={onPhysicianSelected} />
      )}
      {isLoggedIn && roles.includes('Physician') && (
        <GoogleContacts />
      )}
    </header>
  );
};

export default Header;
