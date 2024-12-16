// src/models/PatientModels.ts

export interface Email {
  note: string;
  email: string;
  type: string;
}

export interface Address {
  note: string;
  address: string;
  type: string;
}

export interface Phone {
  note: string;
  phone: string;
  type: string;
}

export interface Bookmark {
  id: string;
  name: string;
}

export interface Patient {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  cpf: string;
  dateOfFirstContact: string;
  bookmarks: Bookmark[]; // Change to Bookmarks[]
  deleted?: boolean; // Add the deleted field
}

export interface DetailedPatient extends Patient {
  emails: Email[];
  addresses: Address[];
  phones: Phone[];
  bloodType: string;
  rhFactor: string;
  ethnicGroup: string;
  observation: string;
  notes: string;
  howPatientWasReferred: string;
}