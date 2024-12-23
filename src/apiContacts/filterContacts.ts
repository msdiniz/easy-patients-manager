/**
 * Filters contacts based on the provided filter text and selected groups.
 * @param contacts - The contacts to filter.
 * @param filterText - The filter text.
 * @param selectedGroups - The selected contact group IDs.
 * @returns The filtered contacts.
 */
function filterContacts(contacts: gapi.client.people.Person[], filterText: string, selectedGroups: string[]): gapi.client.people.Person[] {
  // Filter contacts by selected groups
  let filteredContacts = contacts.filter(person => {
    const memberships = person.memberships || [];
    return memberships.some(membership =>
      membership.contactGroupMembership &&
      selectedGroups.includes(membership.contactGroupMembership.contactGroupId!)
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
function filterContactsByGroup(contacts: gapi.client.people.Person[], selectedGroups: string[]): gapi.client.people.Person[] {
  return contacts.filter(person => {
    const memberships = person.memberships || [];
    return memberships.some(membership =>
      membership.contactGroupMembership &&
      selectedGroups.includes(membership.contactGroupMembership.contactGroupId!)
    );
  });
}

/**
 * Returns contacts that do not belong to patient groups.
 * @param contacts - The contacts to filter.
 * @returns The contacts that do not belong to patient groups.
 */
function returnContactsThatDoNotBelongToPatientGroups(contacts: gapi.client.people.Person[], selectedGroups: string[]): gapi.client.people.Person[] {
  return contacts.filter(person => {
    const memberships = person.memberships || [];
    return !memberships.some(membership =>
      membership.contactGroupMembership &&
      selectedGroups.includes(membership.contactGroupMembership.contactGroupId!)
    );
  });
}

export {
  filterContacts,
  filterContactsByGroup,
  returnContactsThatDoNotBelongToPatientGroups,
};
