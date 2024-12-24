import { Patient, DetailedPatient } from '../models/PatientModels';

export const transformContactsToPatients = (contacts: gapi.client.people.Person[]): Patient[] => {
  return contacts.map(contact => ({
    id: contact.resourceName || '',
    fullName: contact.names?.[0]?.displayName || '',
    dob: contact.birthdays?.[0]?.date ? `${contact.birthdays[0].date.year}-${contact.birthdays[0].date.month}-${contact.birthdays[0].date.day}` : '', // Transform to string
    gender: contact.genders?.[0]?.value || '',
    email: contact.emailAddresses?.[0]?.value || '',
    phone: contact.phoneNumbers?.[0]?.value || '',
    address: contact.addresses?.[0]?.formattedValue || '',
    cpf: '', // Default value for cpf
    dateOfFirstContact: new Date().toISOString(), // Transform to string
    deleted: false,
    bookmarks: []
  }));
};

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