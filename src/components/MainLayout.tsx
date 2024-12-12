// src/components/MainLayout.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PatientList } from './PatientList';
import { PatientDetails } from './PatientDetails';
import { PatientInfo } from './PatientInfo';
import { Patient, DetailedPatient } from '../models/Patient';
import { transformToDetailedPatient } from '../utils/transformPatient';
import logo from '../assets/96x96.png';
// import './MainLayout.css'; // Ensure component-specific styles are imported if it exists

export const MainLayout: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<DetailedPatient | null>(null);
  const [patients, setPatients] = useState<DetailedPatient[]>([]);

  useEffect(() => {
    console.log('MainLayout component mounted');
    const storedPatients = localStorage.getItem('patients');
    console.log('Checking localStorage for patients:', storedPatients);
    if (storedPatients) {
      const parsedPatients = JSON.parse(storedPatients).map((patient: Patient) => transformToDetailedPatient(patient));
      console.log('Loaded patients from localStorage:', parsedPatients);
      setPatients(parsedPatients);
    } else {
      axios.get('/data/patients.json')
        .then(response => {
          const transformedPatients = response.data.map((patient: Patient) => transformToDetailedPatient(patient));
          console.log('Loaded patients from JSON file:', transformedPatients);
          setPatients(transformedPatients);
        })
        .catch(error => {
          console.error('Error loading patients from JSON file:', error);
        });
    }
  }, []);

  useEffect(() => {
    console.log('Current patients state:', patients);
  }, [patients]);

  const handleSelectPatient = (patient: DetailedPatient | null) => {
    console.log('Patient selected in MainLayout:', patient);
    setSelectedPatient(patient);
  };

  const handleAddPatient = (patient: DetailedPatient) => {
    console.log('Patient added:', patient);
    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    console.log('Saved patients to localStorage:', updatedPatients);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedPatient) {
      setSelectedPatient({
        ...selectedPatient,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (selectedPatient) {
      console.log('Patient saved:', selectedPatient);
      const updatedPatients = patients.map(p =>
        p.id === selectedPatient.id ? selectedPatient : p
      );
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      console.log('Saved patients to localStorage:', updatedPatients);
      setSelectedPatient(null);
    }
  };

  const handleCancel = () => {
    setSelectedPatient(null);
  };

  const isFormValid = selectedPatient !== null && selectedPatient.fullName.trim() !== '';

  return (
    <div className="main-layout">
      <header>
        <img src={logo} alt="Logo" />
        <h1>EasyPatientsManager</h1>
        <button>Login/Logout</button>
        <button>Close</button>
      </header>
      <div className="content">
        <PatientList
          onSelectPatient={handleSelectPatient}
          selectedPatientId={selectedPatient?.id || null}
          patients={patients}
        />
        {selectedPatient && (
          <PatientInfo patient={selectedPatient} /> // Render PatientInfo instead of PatientForm
        )}
        {/* Uncomment the following lines if you want to render PatientForm for editing */}
        {/* {selectedPatient && (
          <PatientForm
            patient={selectedPatient}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
            isFormValid={isFormValid}
          />
        )} */}
      </div>
    </div>
  );
};
