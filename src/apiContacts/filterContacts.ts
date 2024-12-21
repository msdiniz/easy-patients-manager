import { people_v1 } from 'googleapis';
import { contactGroupIds } from './constants';

/**
 * Filters contacts based on the provided filter text and selected groups.
 * @param contacts - The contacts to filter.
 * @param filterText - The filter text.
 * @param selectedGroups - The selected contact group IDs.
 * @returns The filtered contacts.
 */
function filterContacts(contacts: people_v1.Schema$Person[], filterText: string, selectedGroups: string[]): people_v1.Schema$Person[] {
  // Filter contacts by selected groups
  let filteredContacts = contacts.filter(person => {
    const memberships = person.memberships || [];
    return memberships.some(membership =>
      membership.contactGroupMembership &&
      selectedGroups.includes(membership.contactGroupMembership.contactGroupResourceName!)
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
 * @param contacts - The contacts to filter.
 * @param selectedGroups - The selected contact group IDs.
 * @returns The filtered contacts.
 */
function filterContactsByGroup(contacts: people_v1.Schema$Person[], selectedGroups: string[]): people_v1.Schema$Person[] {
  return contacts.filter(person => {
    const memberships = person.memberships || [];
    return memberships.some(membership =>
      membership.contactGroupMembership &&
      selectedGroups.includes(membership.contactGroupMembership.contactGroupResourceName!)
    );
  });
}

/**
 * Returns contacts that do not belong to patient groups.
 * @param contacts - The contacts to filter.
 * @returns The contacts that do not belong to patient groups.
 */
function returnContactsThatDoNotBelongToPatientGroups(contacts: people_v1.Schema$Person[]): people_v1.Schema$Person[] {
  return contacts.filter(person => {
    const memberships = person.memberships || [];
    return !memberships.some(membership =>
      membership.contactGroupMembership &&
      contactGroupIds.includes(membership.contactGroupMembership.contactGroupResourceName!)
    );
  });
}

export {
  filterContacts,
  filterContactsByGroup,
  returnContactsThatDoNotBelongToPatientGroups,
};
