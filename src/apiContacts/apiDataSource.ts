import { gapi } from 'gapi-script';
import DataSource from './dataSource';

class ApiDataSource extends DataSource {
  private authClient: gapi.auth2.GoogleUser;

  constructor(authClient: gapi.auth2.GoogleUser) {
    super();
    this.authClient = authClient;
  }

  async fetchContacts(): Promise<gapi.client.people.Person[]> {
    const accessToken = this.authClient.getAuthResponse().access_token;
    gapi.client.setToken({ access_token: accessToken });

    const contacts: gapi.client.people.Person[] = [];
    let nextPageToken: string | null = null;

    do {
      try {
        const response = await gapi.client.people.people.connections.list({
          resourceName: 'people/me',
          pageSize: 100,
          personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
          pageToken: nextPageToken || undefined,
        });

        const connections = response.result.connections;
        nextPageToken = response.result.nextPageToken || null;

        if (connections) {
          contacts.push(...connections);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        break;
      }
    } while (nextPageToken);

    return contacts;
  }

  async fetchContact(contactId: string): Promise<gapi.client.people.Person | null> {
    try {
      const response = await gapi.client.people.people.get({
        resourceName: `people/${contactId}`,
        personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
      });
      return response.result;
    } catch (error) {
      console.error('Error fetching contact:', error);
      return null;
    }
  }

  async createContact(contact: gapi.client.people.Person): Promise<gapi.client.people.Person | null> {
    try {
      const response = await gapi.client.people.people.createContact({
        resource: contact,
      });
      return response.result;
    } catch (error) {
      console.error('Error creating contact:', error);
      return null;
    }
  }

  async updateContact(contactId: string, contact: gapi.client.people.Person): Promise<gapi.client.people.Person | null> {
    try {
      const response = await gapi.client.people.people.updateContact({
        resourceName: `people/${contactId}`,
        updatePersonFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
        resource: contact,
      });
      return response.result;
    } catch (error) {
      console.error('Error updating contact:', error);
      return null;
    }
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      await gapi.client.people.people.deleteContact({
        resourceName: `people/${contactId}`,
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }
}

export default ApiDataSource;