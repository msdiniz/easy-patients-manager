import { toast } from 'react-toastify';
import ApiDataSource from '../apiContacts/apiDataSource';
import { Tokens } from '../types/types';
import { filterContactsByGroup, returnContactsThatDoNotBelongToPatientGroups } from '../apiContacts/filterContacts';
import { patientGroupsIds } from '../apiContacts/constants';
import { getFileServerPort } from './getServerPort';

export const fetchContacts = async (tokens: Tokens): Promise<gapi.client.people.Person[]> => {
  const apiDataSource = new ApiDataSource(tokens);
  try {
    const contacts = await apiDataSource.fetchContacts();
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    toast.error('Error fetching contacts');
    return [];
  }
};

export const saveFilteredContacts = async (contacts: gapi.client.people.Person[]) => {
  if (contacts.length === 0) {
    toast.error('No contacts to save');
    return;
  }

  const patientsGoogle = filterContactsByGroup(contacts, patientGroupsIds);
  const contactsGoogle = returnContactsThatDoNotBelongToPatientGroups(contacts, patientGroupsIds);

  try {
    await saveToFile('patientsGoogle.json', patientsGoogle);
    await saveToFile('contactsGoogle.json', contactsGoogle);
    toast.success('Contacts saved successfully');
  } catch (error) {
    toast.error('Error saving contacts');
  }
};

const saveToFile = async (filename: string, data: any) => {
  const fileServerPort = getFileServerPort();
  const response = await fetch(`https://localhost:${fileServerPort}/save-file`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filename, data }),
  });

  if (!response.ok) {
    throw new Error('Failed to save file');
  }
};
