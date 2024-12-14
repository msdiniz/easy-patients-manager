import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { PatientList } from './PatientList/PatientList'; // Use named import
import PatientDetails from './PatientDetails';
import Header from './Header';
import { setPatients } from '../store';
import { getPatients } from '../store/selectors';

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const patients = useSelector(getPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedPatientFullName, setSelectedPatientFullName] = useState<string | null>(null);

  useEffect(() => {
    console.log('MainLayout component mounted');
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
      const parsedPatients = JSON.parse(storedPatients);
      dispatch(setPatients(parsedPatients));
    } else {
      axios.get('/data/patients.json')
        .then(response => {
          dispatch(setPatients(response.data));
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
          patients={patients}
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