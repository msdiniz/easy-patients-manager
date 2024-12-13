import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { PatientList } from './PatientList'; // Use named import
import PatientDetails from './PatientDetails';
import Header from './Header';
import { setPatients } from '../store';
// import { Patient } from '../models/PatientModels';
import { getPatients } from '../store/selectors';

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const patients = useSelector(getPatients);

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

  return (
    <div className="main-layout">
      <Header />
      <div className="content">
        <PatientList
          onSelectPatient={() => {}}
          selectedPatientId={null}
          patients={patients}
        />
        <PatientDetails />
      </div>
    </div>
  );
};