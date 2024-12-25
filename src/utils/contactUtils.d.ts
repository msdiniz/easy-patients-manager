import { Tokens } from '../types/types';
export declare const fetchContacts: (tokens: Tokens) => Promise<gapi.client.people.Person[]>;
export declare const saveFilteredContacts: (contacts: gapi.client.people.Person[]) => Promise<void>;
