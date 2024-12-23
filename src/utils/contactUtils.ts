import { filterContactsByGroup, returnContactsThatDoNotBelongToPatientGroups } from '../apiContacts/filterContacts';
import { contactGroupIds } from '../apiContacts/constants';
import { toast } from 'react-toastify';
import { getFileServerPort } from './getServerPort';

export const saveFilteredContacts = async (contacts: gapi.client.people.Person[]) => {
  if (contacts.length === 0) {
    toast.error('No contacts to save');
    return;
  }

  const patientsGoogle = filterContactsByGroup(contacts, contactGroupIds);
  const contactsGoogle = returnContactsThatDoNotBelongToPatientGroups(contacts, contactGroupIds);

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