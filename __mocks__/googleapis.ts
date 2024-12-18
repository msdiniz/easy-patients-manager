export const google = {
  auth: {
    OAuth2: jest.fn().mockImplementation(() => ({
      setCredentials: jest.fn(),
    })),
  },
  people: jest.fn((options: { version: string }) => {
    const { version } = options;
    console.log(`Mocked google.people called with version:`, version);
    if (version === 'v1') {
      return {
        people: {
          connections: {
            list: jest.fn().mockImplementation(() => ({
              data: { connections: [{ resourceName: 'people/1', names: [{ displayName: 'John Doe' }] }], nextPageToken: null },
            })),
          },
          get: jest.fn().mockImplementation(({ resourceName }: { resourceName: string }) => ({
            data: { resourceName, names: [{ displayName: 'John Doe' }] },
          })),
          createContact: jest.fn().mockImplementation(({ requestBody }: { requestBody: any }) => ({
            data: { resourceName: 'people/2', ...requestBody },
          })),
          updateContact: jest.fn().mockImplementation(({ resourceName, requestBody }: { resourceName: string, requestBody: any }) => ({
            data: { ...requestBody, resourceName },
          })),
          deleteContact: jest.fn().mockResolvedValue({}),
        },
        contactGroups: {
          list: jest.fn().mockResolvedValue({ data: { contactGroups: [] } }),
        },
      };
    }
    throw new Error(`Unsupported API version: ${version}`);
  }),
};
