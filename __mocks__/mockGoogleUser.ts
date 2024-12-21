import { gapi } from 'gapi-script';

export const mockGoogleUser: gapi.auth2.GoogleUser = {
  getId: jest.fn().mockReturnValue('mock-id'),
  isSignedIn: jest.fn().mockReturnValue(true),
  getHostedDomain: jest.fn().mockReturnValue('mock-domain'),
  getGrantedScopes: jest.fn().mockReturnValue('mock-scopes'),
  getBasicProfile: jest.fn().mockReturnValue({
    getId: jest.fn().mockReturnValue('mock-id'),
    getName: jest.fn().mockReturnValue('mock-name'),
    getGivenName: jest.fn().mockReturnValue('mock-given-name'),
    getFamilyName: jest.fn().mockReturnValue('mock-family-name'),
    getImageUrl: jest.fn().mockReturnValue('mock-image-url'),
    getEmail: jest.fn().mockReturnValue('mock-email'),
  }),
  getAuthResponse: jest.fn().mockReturnValue({
    access_token: 'mock-access-token',
    id_token: 'mock-id-token',
    scope: 'mock-scope',
    expires_in: 3600,
    first_issued_at: Date.now(),
    expires_at: Date.now() + 3600,
  }),
  reloadAuthResponse: jest.fn().mockResolvedValue({
    access_token: 'mock-access-token',
    id_token: 'mock-id-token',
    scope: 'mock-scope',
    expires_in: 3600,
    first_issued_at: Date.now(),
    expires_at: Date.now() + 3600,
  }),
  hasGrantedScopes: jest.fn().mockReturnValue(true),
  grant: jest.fn().mockResolvedValue({
    access_token: 'mock-access-token',
    id_token: 'mock-id-token',
    scope: 'mock-scope',
    expires_in: 3600,
    first_issued_at: Date.now(),
    expires_at: Date.now() + 3600,
  }),
  disconnect: jest.fn(),
  signOut: jest.fn(),
};