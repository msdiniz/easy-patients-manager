import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Patient, DetailedPatient } from '../models/PatientModels';
import { PatientFactory } from '../models/PatientFactory';
import { transformToDetailedPatient } from '../utils/transformPatient';
import './PatientList.css'; // Ensure component-specific styles are imported
import { PatientUtils } from '../models/PatientUtils';
import { setSelectedPatient, setIsEditing, setIsAdding } from '../store';

interface PatientListProps {
  onSelectPatient: (patient: DetailedPatient | null) => void;
  selectedPatientId: string | null;
  patients: DetailedPatient[];
}

export const PatientList: React.FC<PatientListProps> = ({ onSelectPatient, selectedPatientId, patients = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [useProperCase, setUseProperCase] = useState(true);
  const dispatch = useDispatch();

  console.log('Patients received by PatientList:', patients);

  const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Create a new sorted array instead of mutating the original
  const sortedPatients = [...patients].sort((a, b) => {
    return normalizeString(a.fullName).localeCompare(normalizeString(b.fullName));
  });

  const filteredPatients = sortedPatients.filter(patient =>
    normalizeString(patient.fullName).toLowerCase().includes(normalizeString(searchTerm).toLowerCase())
  );

  const handleNewPatient = () => {
    if (PatientUtils.isValidName(searchTerm)) {
      const newPatient: Patient = PatientFactory.createNewForPatientList(searchTerm, useProperCase);
      const detailedPatient: DetailedPatient = transformToDetailedPatient(newPatient);
      dispatch(setSelectedPatient(detailedPatient));
      dispatch(setIsEditing(true));
      dispatch(setIsAdding(true));
      setSearchTerm(''); // Reset the search term
    }
  };

  const handleSelectPatient = (patient: Patient) => {
    const detailedPatient: DetailedPatient = transformToDetailedPatient(patient);
    console.log('Selected Patient:', detailedPatient);
    dispatch(setSelectedPatient(detailedPatient));
    onSelectPatient(detailedPatient);
  };

  const handlePatientClick = (patient: Patient) => {
    console.log('Patient being passed to detail view:', patient);
    handleSelectPatient(patient);
  };

  return (
    <div className="patient-list">
      <input
        type="text"
        placeholder="Search just by typing here..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={useProperCase}
            onChange={e => setUseProperCase(e.target.checked)}
          />
          Use Proper Case
        </label>
      </div>
      <div className="button-container">
        {searchTerm && PatientUtils.isValidName(searchTerm) && (
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
            onClick={() => handlePatientClick(patient)}
            className={patient.id === selectedPatientId ? 'selected' : ''}
          >
            {patient.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
};