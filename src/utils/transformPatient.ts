import { Patient, DetailedPatient } from '../models/PatientModels';

export const transformToDetailedPatient = (patient: Patient): DetailedPatient => {
  return {
    ...patient,
    bookmarks: patient.bookmarks === null ? [] : patient.bookmarks,
    deleted: patient.deleted !== undefined ? patient.deleted : undefined,    
    emails: [],
    addresses: [],
    phones: [],
    bloodType: '',
    rhFactor: '',
    ethnicGroup: '',
    observation: '',
    notes: '',
    howPatientWasReferred: ''
  };
};

export const transformToPatient = (detailedPatient: DetailedPatient): Patient => {
  return {
    id: detailedPatient.id,
    fullName: detailedPatient.fullName,
    dob: detailedPatient.dob,
    gender: detailedPatient.gender,
    cpf: detailedPatient.cpf,
    dateOfFirstContact: detailedPatient.dateOfFirstContact,
    bookmarks: detailedPatient.bookmarks  === null ? [] : detailedPatient.bookmarks,
    deleted: detailedPatient.deleted !== undefined ? detailedPatient.deleted : undefined
  };
};