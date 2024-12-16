import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { PatientList } from './PatientList/PatientList'; // Use named import
import PatientDetails from '././Details/PatientDetails';
import Header from './Header';
import { setPatients } from '../store';
import { getPatientsFromStorage, savePatientsToStorage } from '../utils/patientStorage';

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedPatientFullName, setSelectedPatientFullName] = useState<string | null>(null);

  useEffect(() => {
    console.log('MainLayout component mounted');
    const parsedPatients = getPatientsFromStorage();
    if (parsedPatients.length > 0) {
      dispatch(setPatients(parsedPatients));
    } else {
      axios.get('/data/patients.json')
        .then(response => {
          const patients = response.data;
          dispatch(setPatients(patients));
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

  return (
    <div className="main-layout">
      <Header />
      <div className="content">
        <PatientList
          onSelectPatient={handleSelectPatient}
          selectedPatientId={selectedPatientId}
        />
        {selectedPatientId && selectedPatientFullName && (
          <PatientDetails
            patientId={selectedPatientId}
            fullName={selectedPatientFullName}
          />
        )}
      </div>
    </div>
  );
};
