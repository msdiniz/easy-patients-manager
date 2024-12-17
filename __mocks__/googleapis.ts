export const google = {
    auth: {
      OAuth2: jest.fn().mockImplementation(() => ({
        setCredentials: jest.fn(),
      })),
    },
    people: jest.fn((version: any) => {
      console.log(`Mocked google.people called with version:`, version);
      if (version === 'v1') {
        return {
          people: {
            connections: {
              list: jest.fn().mockResolvedValue({ data: { connections: [], nextPageToken: null } }),
            },
            get: jest.fn().mockResolvedValue({ data: {} }),
            createContact: jest.fn().mockResolvedValue({ data: {} }),
            updateContact: jest.fn().mockResolvedValue({ data: {} }),
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