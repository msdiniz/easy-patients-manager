import axios, { AxiosResponse } from 'axios';

interface Tokens {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

interface PeopleApiResponse {
  connections: gapi.client.people.Person[];
  nextPageToken?: string;
}

class ApiDataSource {
  private tokens: Tokens;

  constructor(tokens: Tokens) {
    this.tokens = tokens;
  }

  async fetchContacts(): Promise<gapi.client.people.Person[]> {
    const contacts: gapi.client.people.Person[] = [];
    let nextPageToken: string | null = null;

    do {
      try {
        const response: AxiosResponse<PeopleApiResponse> = await axios.get('https://people.googleapis.com/v1/people/me/connections', {
          params: {
            pageSize: 100,
            personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
            pageToken: nextPageToken || undefined,
          },
          headers: {
            Authorization: `Bearer ${this.tokens.access_token}`,
          },
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

  async fetchContact(contactId: string): Promise<gapi.client.people.Person | null> {
    try {
      const response: AxiosResponse<gapi.client.people.Person> = await axios.get(`https://people.googleapis.com/v1/people/${contactId}`, {
        params: {
          personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
        },
        headers: {
          Authorization: `Bearer ${this.tokens.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      return null;
    }
  }

  async createContact(contact: gapi.client.people.Person): Promise<gapi.client.people.Person | null> {
    try {
      const response: AxiosResponse<gapi.client.people.Person> = await axios.post('https://people.googleapis.com/v1/people:createContact', contact, {
        headers: {
          Authorization: `Bearer ${this.tokens.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      return null;
    }
  }

  async updateContact(contactId: string, contact: gapi.client.people.Person): Promise<gapi.client.people.Person | null> {
    try {
      const response: AxiosResponse<gapi.client.people.Person> = await axios.patch(`https://people.googleapis.com/v1/people/${contactId}:updateContact`, contact, {
        params: {
          updatePersonFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
        },
        headers: {
          Authorization: `Bearer ${this.tokens.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      return null;
    }
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      await axios.delete(`https://people.googleapis.com/v1/people/${contactId}:deleteContact`, {
        headers: {
          Authorization: `Bearer ${this.tokens.access_token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }
}

export default ApiDataSource;