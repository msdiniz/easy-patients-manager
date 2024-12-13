import { google, people_v1 } from 'googleapis';
import { GaxiosResponse } from 'gaxios';
import { OAuth2Client } from 'google-auth-library';
import DataSource from './dataSource';

class ApiDataSource extends DataSource {
  private people: people_v1.People;

  constructor(oauth2Client: OAuth2Client) {
    super();
    console.log('Initializing google.people with:', { version: 'v1', auth: oauth2Client });
    this.people = google.people({
      version: 'v1',
      auth: oauth2Client,
    });
  }

  async fetchContacts(): Promise<people_v1.Schema$Person[]> {
    let nextPageToken: string | null = null;
    const contacts: people_v1.Schema$Person[] = [];
    do {
      try {
        const res: GaxiosResponse<people_v1.Schema$ListConnectionsResponse> = await this.people.people.connections.list({
          resourceName: 'people/me',
          pageSize: 100, // Fetch in larger chunks
          personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
          pageToken: nextPageToken || undefined,
        });

        const connections = res.data.connections;
        nextPageToken = res.data.nextPageToken || null;

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
    try {
      const res: GaxiosResponse<people_v1.Schema$Person> = await this.people.people.get({
        resourceName: `people/${contactId}`,
        personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      return null;
    }
  }

  async createContact(contact: people_v1.Schema$Person): Promise<people_v1.Schema$Person | null> {
    try {
      const res: GaxiosResponse<people_v1.Schema$Person> = await this.people.people.createContact({
        requestBody: contact,
      });
      return res.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      return null;
    }
  }

  async updateContact(contactId: string, contact: people_v1.Schema$Person): Promise<people_v1.Schema$Person | null> {
    try {
      const res: GaxiosResponse<people_v1.Schema$Person> = await this.people.people.updateContact({
        resourceName: `people/${contactId}`,
        updatePersonFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
        requestBody: contact,
      });
      return res.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      return null;
    }
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      await this.people.people.deleteContact({
        resourceName: `people/${contactId}`,
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }
}

export default ApiDataSource;
