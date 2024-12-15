import { Patient, DetailedPatient } from '../models/PatientModels';
export declare const getPatientsFromStorage: () => Patient[];
export declare const savePatientsToStorage: (patients: Patient[]) => void;
export declare const getDetailedPatientsFromStorage: () => DetailedPatient[];
export declare const saveDetailedPatientsToStorage: (detailedPatients: DetailedPatient[]) => void;
