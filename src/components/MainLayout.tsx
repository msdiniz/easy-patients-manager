import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { PatientList } from './PatientList';
import { PatientInfo } from './PatientInfo';
import { PatientForm } from './PatientForm';
import { transformToDetailedPatient } from '../utils/transformPatient';
import logo from '../assets/96x96.png';
import {
  setSelectedPatient,
  setPatients,
  setIsEditing,
  setIsAdding,
  RootState
} from '../store';
import { Patient, DetailedPatient } from '../models/PatientModels';
import { PatientFactory } from '../models/PatientFactory';

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedPatient, patients, isEditing, isAdding } = useSelector((state: RootState) => state);

  useEffect(() => {
    console.log('MainLayout component mounted');
    const storedPatients = localStorage.getItem('patients');
    console.log('Checking localStorage for patients:', storedPatients);
    if (storedPatients) {
      const parsedPatients = JSON.parse(storedPatients).map((patient: Patient) => transformToDetailedPatient(patient));
      console.log('Loaded patients from localStorage:', parsedPatients);
      dispatch(setPatients(parsedPatients));
    } else {
      axios.get('/data/patients.json')
        .then(response => {
          const transformedPatients = response.data.map((patient: Patient) => transformToDetailedPatient(patient));
          console.log('Loaded patients from JSON file:', transformedPatients);
          dispatch(setPatients(transformedPatients));
        })
        .catch(error => {
          console.error('Error loading patients from JSON file:', error);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('Current patients state:', patients);
  }, [patients]);

  useEffect(() => {
    console.log('isEditing:', isEditing, 'isAdding:', isAdding);
  }, [isEditing, isAdding]);

  const handleSelectPatient = (patient: DetailedPatient | null) => {
    if (patient) {
      console.log('Patient selected in MainLayout:', patient);
      dispatch(setSelectedPatient(patient));
      if (isEditing || isAdding) {
        dispatch(setIsEditing(false));
        dispatch(setIsAdding(false));
      }
    } else {
      dispatch(setSelectedPatient(null));
    }
  };

  const handleAddPatient = () => {
    console.log('BEGIN: handleAddPatient called');
    const newPatient = PatientFactory.createNewForPatientDetail();
    dispatch(setSelectedPatient(newPatient));
    dispatch(setIsEditing(true));
    dispatch(setIsAdding(true));
    console.log('END: handleAddPatient called');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedPatient) {
      dispatch(setSelectedPatient({
        ...selectedPatient,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSave = () => {
    if (selectedPatient) {
      console.log('Patient saved:', selectedPatient);
      let updatedPatients;
      if (isAdding) {
        const newPatientWithId: DetailedPatient = {
          ...selectedPatient,
          id: (patients.length + 1).toString(),
          bloodType: selectedPatient.bloodType || '',
          rhFactor: selectedPatient.rhFactor || '',
          ethnicGroup: selectedPatient.ethnicGroup || '',
          observation: selectedPatient.observation || '',
          notes: selectedPatient.notes || '',
          howPatientWasReferred: selectedPatient.howPatientWasReferred || ''
        };
        updatedPatients = [...patients, newPatientWithId];
        console.log('Adding new patient:', newPatientWithId);
        dispatch(setSelectedPatient(newPatientWithId)); // Ensure the new patient is selected
      } else {
        updatedPatients = patients.map(p =>
          p.id === selectedPatient.id ? selectedPatient : p
        );
        console.log('Updating existing patient:', selectedPatient);
      }
      dispatch(setPatients(updatedPatients as DetailedPatient[]));
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      console.log('Saved patients to localStorage:', updatedPatients);
      dispatch(setIsEditing(false));
      dispatch(setIsAdding(false));
    }
  };

  const handleCancel = () => {
    dispatch(setSelectedPatient(null));
    dispatch(setIsEditing(false));
    dispatch(setIsAdding(false));
  };

  const isFormValid = selectedPatient !== null && selectedPatient.fullName.trim() !== '';

  return (
    <div className="main-layout">
      <header>
        <img src={logo} alt="Logo" />
        <h1>EasyPatientsManager</h1>
        <button onClick={() => {
          console.log('Add Patient button clicked');
          handleAddPatient();
        }}>Add Patient</button>
        <button>Login/Logout</button>
        <button>Close</button>
      </header>
      <div className="content">
        <PatientList
          onSelectPatient={handleSelectPatient}
          selectedPatientId={selectedPatient?.id || null}
          patients={patients as DetailedPatient[]}
        />
        {selectedPatient && (
          <div className="patient-details">
            {isEditing || isAdding ? (
              <PatientForm
                patient={selectedPatient as DetailedPatient} // Ensure the type is DetailedPatient
                onChange={handleChange}
                onSave={handleSave}
                onCancel={handleCancel}
                isFormValid={isFormValid}
              />
            ) : (
              <PatientInfo
                patient={selectedPatient as DetailedPatient} // Ensure the type is DetailedPatient
                onEdit={() => {
                  dispatch(setIsEditing(true));
                  console.log('onEdit called');
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};