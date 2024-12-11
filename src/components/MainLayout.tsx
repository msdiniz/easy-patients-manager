// src/components/MainLayout.tsx
import React, { useState } from 'react';
import { PatientList } from './PatientList';
import { PatientDetails } from './PatientDetails';
import { Patient } from '../models/Patient';

export const MainLayout: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="main-layout">
      <header>
        <img src="logo.png" alt="Logo" />
        <h1>EasyPatientsManager</h1>
        <button>Login/Logout</button>
        <button>Close</button>
      </header>
      <div className="content">
        <PatientList onSelectPatient={setSelectedPatient} selectedPatientId={selectedPatient?.id || null} />
        <PatientDetails patient={selectedPatient} />
      </div>
    </div>
  );
};