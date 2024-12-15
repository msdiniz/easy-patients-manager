import { Patient, DetailedPatient } from '../models/PatientModels';

export const transformToDetailedPatient = (patient: Patient): DetailedPatient => {
  return {
    ...patient,
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
    bookmarks: detailedPatient.bookmarks, // Corrected to bookmarks
    deleted: detailedPatient.deleted // Ensure the deleted field is included
  };
};