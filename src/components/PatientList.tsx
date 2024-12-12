// src/components/PatientList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../models/Patient';

interface PatientListProps {
  onSelectPatient: (patient: Patient) => void;
  selectedPatientId: string | null;
}

export const PatientList: React.FC<PatientListProps> = ({ onSelectPatient, selectedPatientId }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/data/patients.json').then(response => {
      setPatients(response.data);
    });
  }, []);

  const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const sortedPatients = patients.sort((a, b) => {
    return normalizeString(a.fullName).localeCompare(normalizeString(b.fullName));
  });

  const filteredPatients = sortedPatients.filter(patient =>
    normalizeString(patient.fullName).toLowerCase().includes(normalizeString(searchTerm).toLowerCase())
  );

  return (
    <div className="patient-list">
      <input
        type="text"
        placeholder="Search just by typing here..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button>New Patient</button>
      <ul>
        {filteredPatients.map(patient => (
          <li
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={patient.id === selectedPatientId ? 'selected' : ''}
          >
            {patient.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
};