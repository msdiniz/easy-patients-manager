import { Patient, DetailedPatient } from '../models/PatientModels';
export declare const transformToDetailedPatient: (patient: Patient) => DetailedPatient;
export declare const transformToPatient: (detailedPatient: DetailedPatient) => Patient;
