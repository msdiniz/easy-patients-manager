import { Patient, DetailedPatient } from '../models/PatientModels';
export declare const transformContactsToPatients: (contacts: gapi.client.people.Person[]) => Patient[];
export declare const transformToDetailedPatient: (patient: Patient) => DetailedPatient;
export declare const transformToPatient: (detailedPatient: DetailedPatient) => Patient;
