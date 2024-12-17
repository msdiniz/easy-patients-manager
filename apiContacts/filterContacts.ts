import { allContacts } from '../shared/contactsState';

interface Contact {
  names?: Array<{ displayName: string }>;
  memberships?: Array<{ contactGroupMembership: { contactGroupResourceName: string } }>;
}

/**
 * Filters contacts based on the provided filter text and selected groups.
 * @param filterText - The filter text. // document.getElementById('filter-text').value.trim().toLowerCase()
 * @param selectedGroups - The selected contact group IDs. // Array.from(document.querySelectorAll('#bookmark-panel input[type="checkbox"]:checked')).map(checkbox => checkbox.value)
 * @returns The filtered contacts.
 */
function filterContacts(filterText: string, selectedGroups: string[]): Contact[] {
  // Filter contacts by selected groups
  let filteredContacts = allContacts.filter(person => {
    const memberships = person.memberships || [];
    return memberships.some(membership =>
      membership.contactGroupMembership &&
      selectedGroups.includes(membership.contactGroupMembership.contactGroupResourceName)
    );
  });

  // Apply text filter
  if (filterText) {
    filteredContacts = filteredContacts.filter(person => {
      const contactName = person.names?.[0]?.displayName?.toLowerCase() || '';
      return contactName.includes(filterText);
    });
  }

  return filteredContacts;
}

/**
 * Filters contacts based on the selected groups.
 * @param selectedGroups - The selected contact group IDs. // Array.from(document.querySelectorAll('#bookmark-panel input[type="checkbox"]:checked')).map(checkbox => checkbox.value)
 * @returns The filtered contacts.
 */
function filterContactsByGroup(selectedGroups: string[]): Contact[] {
  const filteredContacts = allContacts.filter(person => {
    const memberships = person.memberships || [];
    return memberships.some(membership =>
      membership.contactGroupMembership &&
      selectedGroups.includes(membership.contactGroupMembership.contactGroupResourceName)
    );
  });

  return filteredContacts;
}

export {
  filterContacts,
  filterContactsByGroup,
};