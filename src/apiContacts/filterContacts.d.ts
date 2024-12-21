import { people_v1 } from 'googleapis';
/**
 * Filters contacts based on the provided filter text and selected groups.
 * @param contacts - The contacts to filter.
 * @param filterText - The filter text.
 * @param selectedGroups - The selected contact group IDs.
 * @returns The filtered contacts.
 */
declare function filterContacts(contacts: people_v1.Schema$Person[], filterText: string, selectedGroups: string[]): people_v1.Schema$Person[];
/**
 * Filters contacts based on the selected groups.
 * @param contacts - The contacts to filter.
 * @param selectedGroups - The selected contact group IDs.
 * @returns The filtered contacts.
 */
declare function filterContactsByGroup(contacts: people_v1.Schema$Person[], selectedGroups: string[]): people_v1.Schema$Person[];
/**
 * Returns contacts that do not belong to patient groups.
 * @param contacts - The contacts to filter.
 * @returns The contacts that do not belong to patient groups.
 */
declare function returnContactsThatDoNotBelongToPatientGroups(contacts: people_v1.Schema$Person[]): people_v1.Schema$Person[];
export { filterContacts, filterContactsByGroup, returnContactsThatDoNotBelongToPatientGroups, };
