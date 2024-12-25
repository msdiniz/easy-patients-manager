import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import PatientList from './PatientList/PatientList';
import PatientDetails from './Details/PatientDetails';
import Header from './Header/Header';
import SelectPhysician from './Header/SelectPhysician';
import { setPatientsLocal } from '../store/patientSlice';
import { RootState } from '../store';
import { getPatientsFromStorage, savePatientsToStorage } from '../utils/patientStorage';

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedPatientFullName, setSelectedPatientFullName] = useState<string | null>(null);
  const [isPhysicianSelectedByUser, setIsPhysicianSelectedByUser] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.authUser.isLoggedIn);
  const roles = useSelector((state: RootState) => state.authUser.roles);

  useEffect(() => {
    console.log('MainLayout component mounted');
    const parsedPatients = getPatientsFromStorage();
    if (parsedPatients.length > 0) {
      dispatch(setPatientsLocal(parsedPatients));
    } else {
      axios.get('/data/patients.json')
        .then(response => {
          const patients = response.data;
          dispatch(setPatientsLocal(patients));
          savePatientsToStorage(patients); // Save to local storage
        })
        .catch(error => {
          console.error('Error loading patients from JSON file:', error);
        });
    }
  }, [dispatch]);

  const handleSelectPatient = (patientId: string, fullName: string) => {
    setSelectedPatientId(patientId);
    setSelectedPatientFullName(fullName);
  };

  const handlePhysicianSelected = () => {
    setIsPhysicianSelectedByUser(true);
  };

  return (
    <div className="main-layout">
      <Header onPhysicianSelected={handlePhysicianSelected} />
      <div className="content">
        {isLoggedIn && (roles.includes('Physician') || isPhysicianSelectedByUser) && (
          <PatientList
            onSelectPatient={handleSelectPatient}
            selectedPatientId={selectedPatientId}
          />
        )}
        {selectedPatientId && selectedPatientFullName && (
          <PatientDetails
            patientId={selectedPatientId}
            fullName={selectedPatientFullName}
          />
        )}
        {isLoggedIn && !roles.includes('Physician') && !isPhysicianSelectedByUser && (
          <SelectPhysician onPhysicianSelected={handlePhysicianSelected} />
        )}
      </div>
    </div>
  );
};

export default MainLayout;
