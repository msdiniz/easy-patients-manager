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
    cpf: string;
    bookmark: string;
    dateOfFirstContact: string;
    bloodType?: string;
    rhFactor?: string;
    ethnicGroup?: string;
    observation?: string;
    notes?: string;
    howPatientWasReferred?: string;
}
export interface DetailedPatient extends Patient {
    bloodType: string;
    rhFactor: string;
    ethnicGroup: string;
    observation: string;
    notes: string;
    howPatientWasReferred: string;
}
export interface PatientDetails extends Patient {
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
