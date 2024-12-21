import { people_v1 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
declare class ApiDataSource {
    private authClient;
    constructor(authClient: OAuth2Client);
    fetchContacts(): Promise<people_v1.Schema$Person[]>;
    fetchContact(contactId: string): Promise<people_v1.Schema$Person | null>;
    createContact(contact: people_v1.Schema$Person): Promise<people_v1.Schema$Person | null>;
    updateContact(contactId: string, contact: people_v1.Schema$Person): Promise<people_v1.Schema$Person | null>;
    deleteContact(contactId: string): Promise<void>;
}
export default ApiDataSource;
