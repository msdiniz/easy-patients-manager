import { Tokens } from '../types/types';
declare class ApiDataSource {
    private tokens;
    constructor(tokens: Tokens);
    fetchContacts(): Promise<gapi.client.people.Person[]>;
    fetchContact(contactId: string): Promise<gapi.client.people.Person | null>;
    createContact(contact: gapi.client.people.Person): Promise<gapi.client.people.Person | null>;
    updateContact(contactId: string, contact: gapi.client.people.Person): Promise<gapi.client.people.Person | null>;
    deleteContact(contactId: string): Promise<void>;
}
export default ApiDataSource;
