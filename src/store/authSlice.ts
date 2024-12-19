import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';
import { OAuth2Client } from 'google-auth-library';

export type AuthState = {
  authClient: OAuth2Client | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  authClient: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthClient(state, action: PayloadAction<OAuth2Client>) {
      state.authClient = action.payload as WritableDraft<OAuth2Client>;
      state.isLoggedIn = true;
    },
    clearAuthClient(state) {
      state.authClient = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAuthClient, clearAuthClient } = authSlice.actions;
export default authSlice.reducer;