import { google } from 'googleapis';
import ApiDataSource from './apiDataSource';

jest.mock('googleapis');

describe.only('ApiDataSource', () => {  // Use .only to focus on this test suite
  let apiDataSource: ApiDataSource;

  beforeEach(() => {
    apiDataSource = new ApiDataSource();
  });

  it('should fetch all contacts', async () => {
    const mockContacts = [{ resourceName: 'people/1', names: [{ displayName: 'John Doe' }] }];
    (google.people('v1').people.connections.list as jest.Mock).mockResolvedValue({
      data: { connections: mockContacts, nextPageToken: null },
    });

    const contacts = await apiDataSource.fetchContacts();
    expect(contacts).toEqual(mockContacts);
  });

  it('should fetch a single contact', async () => {
    const mockContact = { resourceName: 'people/1', names: [{ displayName: 'John Doe' }] };
    (google.people('v1').people.get as jest.Mock).mockResolvedValue({ data: mockContact });

    const contact = await apiDataSource.fetchContact('1');
    expect(contact).toEqual(mockContact);
  });

  it('should create a contact', async () => {
    const newContact = { names: [{ displayName: 'Jane Doe' }] };
    const createdContact = { resourceName: 'people/2', ...newContact };
    (google.people('v1').people.createContact as jest.Mock).mockResolvedValue({ data: createdContact });

    const contact = await apiDataSource.createContact(newContact);
    expect(contact).toEqual(createdContact);
  });

  it('should update a contact', async () => {
    const updatedContact = { resourceName: 'people/1', names: [{ displayName: 'John Smith' }] };
    (google.people('v1').people.updateContact as jest.Mock).mockResolvedValue({ data: updatedContact });

    const contact = await apiDataSource.updateContact('1', updatedContact);
    expect(contact).toEqual(updatedContact);
  });

  it('should delete a contact', async () => {
    (google.people('v1').people.deleteContact as jest.Mock).mockResolvedValue({});

    await expect(apiDataSource.deleteContact('1')).resolves.toBeUndefined();
  });
});