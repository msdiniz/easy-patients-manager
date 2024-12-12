// src/components/PatientList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../models/Patient';
import './PatientList.css'; // Import the CSS file

interface PatientListProps {
  onSelectPatient: (patient: Patient | null) => void;
  selectedPatientId: string | null;
  onAddPatient: (patient: Patient) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ onSelectPatient, selectedPatientId, onAddPatient }) => {
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

  const isValidName = (name: string) => {
    const nameParts = name.trim().split(/\s+/);
    return nameParts.length >= 2 && nameParts.every(part => part.length >= 2);
  };

  const properCase = (name: string) => {
    const lowerCaseWords = ['d', 'da', 'das', 'de', 'do', 'dos', 'e', 'van', 'von'];
    return name
      .toLowerCase()
      .split(' ')
      .map(word => {
        if (lowerCaseWords.includes(word)) {
          return word;
        }
        if (word.length > 1 && word[1] === "'") {
          return word[0].toUpperCase() + "'" + word[2].toUpperCase() + word.slice(3);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  const handleNewPatient = () => {
    if (isValidName(searchTerm)) {
      const newPatient: Patient = {
        id: '',
        fullName: properCase(searchTerm),
        dob: '',
        gender: '',
        cpf: '',
        bloodType: '',
        rhFactor: '',
        ethnicGroup: '',
        bookmark: '',
        observation: '',
        notes: '',
        howPatientWasReferred: '',
        dateOfFirstContact: ''
      };
      onSelectPatient(newPatient);
    }
  };

  const handleAddPatient = (patient: Patient) => {
    const newPatientWithId = { ...patient, id: (patients.length + 1).toString() };
    const updatedPatients = [...patients, newPatientWithId].sort((a, b) => normalizeString(a.fullName).localeCompare(normalizeString(b.fullName)));
    setPatients(updatedPatients);
    console.log('New patient added:', newPatientWithId);
  };

  useEffect(() => {
    onAddPatient(handleAddPatient);
  }, [patients]);

  return (
    <div className="patient-list">
      <input
        type="text"
        placeholder="Search just by typing here..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="button-container">
        {searchTerm && isValidName(searchTerm) && (
          <button onClick={handleNewPatient}>New Patient</button>
        )}
        {searchTerm && (
          <button onClick={() => setSearchTerm('')}>Clear</button>
        )}
      </div>
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
