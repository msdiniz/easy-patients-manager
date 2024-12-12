// src/components/MainLayout.tsx
import React, { useState } from 'react';
import { PatientList } from './PatientList';
import { PatientDetails } from './PatientDetails';
import { Patient } from '../models/Patient';
import logo from '../assets/96x96.png';

export const MainLayout: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  const handleSelectPatient = (patient: Patient | null) => {
    setSelectedPatient(patient);
  };

  const handleAddPatient = (newPatient: Patient) => {
    const newPatientWithId = { ...newPatient, id: (patients.length + 1).toString() };
    const updatedPatients = [...patients, newPatientWithId].sort((a, b) => a.fullName.localeCompare(b.fullName));
    setPatients(updatedPatients);
    setSelectedPatient(newPatientWithId);
    console.log('New patient added:', newPatientWithId);
  };

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
          onAddPatient={handleAddPatient}
        />
        <PatientDetails
          patient={selectedPatient}
          onSaveNewPatient={handleAddPatient}
        />
      </div>
    </div>
  );
};
