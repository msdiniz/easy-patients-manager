import { google, people_v1 } from 'googleapis';
import oauth2Client from '../../auth/oauthClient';
import state from '../../shared/state';
import { allContacts, sortedContacts } from '../../shared/contactsState';
import { contactGroupIds } from './constants'; // Correct import path
import { filterContactsByGroup } from '../ui/contactDisplay';

interface Contact {
  names?: Array<{ displayName: string }>;
  emailAddresses?: Array<{ value: string }>;
  phoneNumbers?: Array<{ value: string }>;
  addresses?: Array<{ formattedValue: string }>;
  memberships?: Array<{ contactGroupMembership: { contactGroupResourceName: string } }>;
  genders?: Array<{ value: string }>;
  birthdays?: Array<{ date: { year: number, month: number, day: number } }>;
  biographies?: Array<{ value: string }>;
}

interface DataSource {
  fetchContacts: () => Promise<Contact[]>;
}

const people: people_v1.People = google.people({
  version: 'v1',
  auth: oauth2Client,
});

async function getContactsGroups(): Promise<void> {
  try {
    const res = await people.contactGroups.list({
      groupFields: 'name',
    });

    const contactGroups = res.data.contactGroups;
    const bookmarkPanel = document.getElementById('bookmark-panel');
    if (bookmarkPanel) {
      bookmarkPanel.innerHTML = '';

      contactGroups?.forEach(group => {
        if (contactGroupIds.includes(group.resourceName!)) {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = group.resourceName!;
          checkbox.checked = true;
          checkbox.addEventListener('change', filterContactsByGroup);
          bookmarkPanel.appendChild(checkbox);

          const label = document.createElement('label');
          label.textContent = group.name!;
          bookmarkPanel.appendChild(label);

          bookmarkPanel.appendChild(document.createElement('br'));
        }
      });

      const maxBookmarkLength = Math.max(...contactGroups.map(group => group.name!.length));
      bookmarkPanel.style.width = `${maxBookmarkLength * 8 + 50}px`; // Approximate character width
    }
  } catch (error) {
    console.error('Error fetching contact groups:', error.response ? error.response.data : error.message);
  }
}

async function fetchContactsFromDataSource(dataSource: DataSource): Promise<Contact[]> {
  return await dataSource.fetchContacts();
}

async function fetchContactsFromAPI(): Promise<Contact[]> {
  let nextPageToken: string | null = null;
  do {
    try {
      const res = await people.people.connections.list({
        resourceName: 'people/me',
        pageSize: 100,
        personFields: 'names,emailAddresses,phoneNumbers,addresses,memberships,genders,birthdays,biographies',
        pageToken: nextPageToken || undefined,
      });

      const connections = res.data.connections;
      nextPageToken = res.data.nextPageToken || null;

      if (connections) {
        allContacts.push(...connections);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      break;
    }
  } while (nextPageToken);
  return allContacts;
}

function sortContacts(contacts: Contact[]): Contact[] {
  return contacts.sort((a, b) => {
    const nameA = a.names?.[0]?.displayName?.toUpperCase() || '';
    const nameB = b.names?.[0]?.displayName?.toUpperCase() || '';
    return nameA.localeCompare(nameB);
  });
}

function filterContacts(contacts: Contact[]): Contact[] {
  return contacts.filter(person => {
    const memberships = person.memberships || [];
    return memberships.some(membership =>
      membership.contactGroupMembership &&
      contactGroupIds.includes(membership.contactGroupMembership.contactGroupResourceName)
    );
  });
}

function calculatePagination(totalContacts: number, pageSize: number): void {
  state.totalPages = Math.ceil(totalContacts / pageSize);
}

async function getContactsList(
  page = 1,
  pageSize = 10,
  displayContactDetails: (contact: Contact) => void,
  updatePaginationControls: (totalContacts: number) => void,
  dataSource: DataSource
): Promise<void> {
  const loadingIndicator = document.getElementById('loading-indicator');
  const patientList = document.getElementById('patient-list');
  if (!patientList || !loadingIndicator) {
    console.error('Required elements not found.');
    return;
  }
  loadingIndicator.classList.remove('hidden');

  try {
    if (allContacts.length === 0) {
      allContacts = await fetchContactsFromAPI();
      sortedContacts = sortContacts(filterContacts(allContacts));
    }

    calculatePagination(sortedContacts.length, pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const contactsForPage = sortedContacts.slice(startIndex, endIndex);

    // Assuming updateUI is removed, you might want to handle the UI update in your React/Electron app
    // updateUI(contactsForPage, displayContactDetails);
    updatePaginationControls(sortedContacts.length);
  } catch (error) {
    console.error('Error in getContactsList:', error);
  } finally {
    loadingIndicator.classList.add('hidden');
  }
}

export {
  getContactsGroups,
  getContactsList,
  fetchContactsFromDataSource,
  sortContacts,
  filterContacts,
  calculatePagination,
};