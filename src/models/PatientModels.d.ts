import { Email, Address, Phone } from './ValueObjects';
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
    bookmarks: Bookmark[];
    deleted?: boolean;
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
