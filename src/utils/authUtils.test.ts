import { handleAuthMessage, fetchAuthUrl } from './authUtils';
import { setAuthClient } from '../store/authSlice';
import { Tokens } from '../types/types';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';

jest.mock('../store/authSlice', () => ({
  setAuthClient: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('authUtils', () => {
  describe('handleAuthMessage', () => {
    let dispatch: Dispatch<any>;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('should dispatch setAuthClient with tokens and userName when valid tokens are received', async () => {
      const tokens: Tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        scope: 'scope',
        token_type: 'Bearer',
        expiry_date: 1234567890,
      };

      const event = new MessageEvent('message', {
        data: tokens,
        origin: window.location.origin,
      });

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ name: 'John Doe' }),
        })
      ) as jest.Mock;

      await handleAuthMessage(event, dispatch);

      expect(setAuthClient).toHaveBeenCalledWith({ tokens, userName: 'John Doe' });
    });

    it('should not dispatch setAuthClient when invalid tokens are received', async () => {
      const invalidTokens = {
        access_token: 'access_token',
        scope: 'scope',
        token_type: 'Bearer',
        expiry_date: 1234567890,
      };

      const event = new MessageEvent('message', {
        data: invalidTokens,
        origin: window.location.origin,
      });

      await handleAuthMessage(event, dispatch);

      expect(setAuthClient).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Invalid tokens received');
    });

    it('should handle errors when fetching user info fails', async () => {
      const tokens: Tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        scope: 'scope',
        token_type: 'Bearer',
        expiry_date: 1234567890,
      };

      const event = new MessageEvent('message', {
        data: tokens,
        origin: window.location.origin,
      });

      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Failed to fetch'))
      ) as jest.Mock;

      await handleAuthMessage(event, dispatch);

      expect(toast.error).toHaveBeenCalledWith('Error fetching user info');
    });
  });

  describe('fetchAuthUrl', () => {
    it('should return the auth URL when the fetch is successful', async () => {
      const backendPort = 5000;
      const authUrl = 'https://auth.url';

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ url: authUrl }),
        })
      ) as jest.Mock;

      const result = await fetchAuthUrl(backendPort);

      expect(result).toBe(authUrl);
    });

    it('should throw an error when the fetch fails with a server error', async () => {
      const backendPort = 5000;

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      ) as jest.Mock;

      await expect(fetchAuthUrl(backendPort)).rejects.toThrow('Server error: 500');
    });

    it('should throw an error when the fetch fails with a client error', async () => {
      const backendPort = 5000;

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
        })
      ) as jest.Mock;

      await expect(fetchAuthUrl(backendPort)).rejects.toThrow('Client error: 400');
    });
  });
});