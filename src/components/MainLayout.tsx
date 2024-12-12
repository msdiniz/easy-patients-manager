// src/components/MainLayout.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PatientList } from './PatientList';
import { PatientInfo } from './PatientInfo';
import { PatientForm } from './PatientForm';
import { Patient, DetailedPatient } from '../models/Patient';
import { transformToDetailedPatient } from '../utils/transformPatient';
import logo from '../assets/96x96.png';
// import './MainLayout.css'; // Ensure component-specific styles are imported if it exists

export const MainLayout: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<DetailedPatient | null>(null);
  const [patients, setPatients] = useState<DetailedPatient[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleAddPatient = () => {
    const newPatient: DetailedPatient = {
      id: '',
      fullName: '',
      dob: '',
      gender: '',
      cpf: '',
      bookmark: '',
      dateOfFirstContact: '',
      bloodType: '',
      rhFactor: '',
      ethnicGroup: '',
      observation: '',
      notes: '',
      howPatientWasReferred: ''
    };
    setSelectedPatient(newPatient);
    setIsEditing(true);
    setIsAdding(true);
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
      let updatedPatients;
      if (isAdding) {
        const newPatientWithId = { ...selectedPatient, id: (patients.length + 1).toString() };
        updatedPatients = [...patients, newPatientWithId];
        console.log('Adding new patient:', newPatientWithId);
      } else {
        updatedPatients = patients.map(p =>
          p.id === selectedPatient.id ? selectedPatient : p
        );
        console.log('Updating existing patient:', selectedPatient);
      }
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      console.log('Saved patients to localStorage:', updatedPatients);
      setSelectedPatient(null);
      setIsEditing(false);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setSelectedPatient(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  const isFormValid = selectedPatient !== null && selectedPatient.fullName.trim() !== '';

  return (
    <div className="main-layout">
      <header>
        <img src={logo} alt="Logo" />
        <h1>EasyPatientsManager</h1>
        <button onClick={handleAddPatient}>Add Patient</button>
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
          <div className="patient-details">
            {isEditing || isAdding ? (
              <PatientForm
                patient={selectedPatient}
                onChange={handleChange}
                onSave={handleSave}
                onCancel={handleCancel}
                isFormValid={isFormValid}
              />
            ) : (
              <PatientInfo
                patient={selectedPatient}
                onEdit={() => setIsEditing(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
