import DataSource from './dataSource';
declare class ApiDataSource extends DataSource {
    private authClient;
    constructor(authClient: gapi.auth2.GoogleUser);
    fetchContacts(): Promise<gapi.client.people.Person[]>;
    fetchContact(contactId: string): Promise<gapi.client.people.Person | null>;
    createContact(contact: gapi.client.people.Person): Promise<gapi.client.people.Person | null>;
    updateContact(contactId: string, contact: gapi.client.people.Person): Promise<gapi.client.people.Person | null>;
    deleteContact(contactId: string): Promise<void>;
}
export default ApiDataSource;
