import { Patient, DetailedPatient } from '../models/Patient';

export const transformToDetailedPatient = (patient: Patient): DetailedPatient => {
  return {
    ...patient,
    bloodType: patient.bloodType || '',
    rhFactor: patient.rhFactor || '',
    ethnicGroup: patient.ethnicGroup || '',
    observation: patient.observation || '',
    notes: patient.notes || '',
    howPatientWasReferred: patient.howPatientWasReferred || '',
    dateOfFirstContact: patient.dateOfFirstContact || ''
  };
};
