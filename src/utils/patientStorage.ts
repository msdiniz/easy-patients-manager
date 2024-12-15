import { Patient, DetailedPatient } from '../models/PatientModels';

export const getPatientsFromStorage = (): Patient[] => {
  const storedPatients = localStorage.getItem('patients');
  return storedPatients ? JSON.parse(storedPatients) : [];
};

export const savePatientsToStorage = (patients: Patient[]): void => {
  localStorage.setItem('patients', JSON.stringify(patients));
};

export const getDetailedPatientsFromStorage = (): DetailedPatient[] => {
  const storedDetailedPatients = localStorage.getItem('detailedPatients');
  return storedDetailedPatients ? JSON.parse(storedDetailedPatients) : [];
};

export const saveDetailedPatientsToStorage = (detailedPatients: DetailedPatient[]): void => {
  localStorage.setItem('detailedPatients', JSON.stringify(detailedPatients));
};