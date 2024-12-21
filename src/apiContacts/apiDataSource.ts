import { google, people_v1 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GaxiosResponse } from 'gaxios';

class ApiDataSource {
  private authClient: OAuth2Client;

  constructor(authClient: OAuth2Client) {
    this.authClient = authClient;
  }

  async fetchContacts(): Promise<people_v1.Schema$Person[]> {
    const peopleService = google.people({ version: 'v1', auth: this.authClient });
    const contacts: people_v1.Schema$Person[] = [];
    let nextPageToken: string | null = null;

    do {
      try {
        const response: GaxiosResponse<people_v1.Schema$ListConnectionsResponse> = await peopleService.people.connections.list({
          resourceName: 'people/me',
          pageSize: 100,
          personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
          pageToken: nextPageToken || undefined,
        });

        const connections = response.data.connections;
        nextPageToken = response.data.nextPageToken || null;

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

  async fetchContact(contactId: string): Promise<people_v1.Schema$Person | null> {
    const peopleService = google.people({ version: 'v1', auth: this.authClient });
    try {
      const response = await peopleService.people.get({
        resourceName: `people/${contactId}`,
        personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      return null;
    }
  }

  async createContact(contact: people_v1.Schema$Person): Promise<people_v1.Schema$Person | null> {
    const peopleService = google.people({ version: 'v1', auth: this.authClient });
    try {
      const response = await peopleService.people.createContact({
        requestBody: contact,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      return null;
    }
  }

  async updateContact(contactId: string, contact: people_v1.Schema$Person): Promise<people_v1.Schema$Person | null> {
    const peopleService = google.people({ version: 'v1', auth: this.authClient });
    try {
      const response = await peopleService.people.updateContact({
        resourceName: `people/${contactId}`,
        updatePersonFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
        requestBody: contact,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      return null;
    }
  }

  async deleteContact(contactId: string): Promise<void> {
    const peopleService = google.people({ version: 'v1', auth: this.authClient });
    try {
      await peopleService.people.deleteContact({
        resourceName: `people/${contactId}`,
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }
}

export default ApiDataSource;