// models/Patient.ts
export interface Email {
  email: string;
  type: string;
}

export interface Address {
  address: string;
  type: string;
}

export interface Phone {
  phone: string;
  type: string;
}

export interface Patient {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  emails: Email[];
  addresses: Address[];
  phones: Phone[];
  cpf: string;
  bloodType: string;
  rhFactor: string;
  ethnicGroup: string;
  bookmark: string;
  observation: string;
  notes: string;
  howPatientWasReferred: string;
  dateOfFirstContact: string;
}

// models/Staff.ts
export interface Staff {
  id: string;
  fullName: string;
  role: string;
  dob: string;
  gender: string;
  emails: Email[];
  addresses: Address[];
  phones: Phone[];
  specialties?: string[];
}