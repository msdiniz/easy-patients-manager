import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { gapi } from 'gapi-script';

interface AuthState {
  isLoggedIn: boolean;
  authClient: gapi.auth2.GoogleUser | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  authClient: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthClient(state, action: PayloadAction<gapi.auth2.GoogleUser>) {
      state.isLoggedIn = true;
      state.authClient = action.payload;
    },
    clearAuthClient(state) {
      state.isLoggedIn = false;
      state.authClient = null;
    },
  },
});

export const { setAuthClient, clearAuthClient } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState }; // Export AuthState