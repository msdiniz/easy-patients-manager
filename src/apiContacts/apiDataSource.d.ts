import { people_v1 } from 'googleapis';
import DataSource from './dataSource';
declare class ApiDataSource extends DataSource {
    private people;
    constructor(authClient: people_v1.Params$Resource$People$Connections$List['auth']);
    fetchContacts(): Promise<people_v1.Schema$Person[]>;
    fetchContact(contactId: string): Promise<people_v1.Schema$Person | null>;
    createContact(contact: people_v1.Schema$Person): Promise<people_v1.Schema$Person | null>;
    updateContact(contactId: string, contact: people_v1.Schema$Person): Promise<people_v1.Schema$Person | null>;
    deleteContact(contactId: string): Promise<void>;
}
export default ApiDataSource;
