/**
 * Filters contacts based on the provided filter text and selected groups.
 * @param contacts - The contacts to filter.
 * @param filterText - The filter text.
 * @param selectedGroups - The selected contact group IDs.
 * @returns The filtered contacts.
 */
declare function filterContacts(contacts: gapi.client.people.Person[], filterText: string, selectedGroups: string[]): gapi.client.people.Person[];
/**
 * Filters contacts based on the selected groups.
 * @param contacts - The contacts to filter.
 * @param selectedGroups - The selected contact group IDs.
 * @returns The filtered contacts.
 */
declare function filterContactsByGroup(contacts: gapi.client.people.Person[], selectedGroups: string[]): gapi.client.people.Person[];
/**
 * Returns contacts that do not belong to patient groups.
 * @param contacts - The contacts to filter.
 * @returns The contacts that do not belong to patient groups.
 */
declare function returnContactsThatDoNotBelongToPatientGroups(contacts: gapi.client.people.Person[], selectedGroups: string[]): gapi.client.people.Person[];
export { filterContacts, filterContactsByGroup, returnContactsThatDoNotBelongToPatientGroups, };
