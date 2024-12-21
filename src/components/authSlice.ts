import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  tokens: {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expiry_date: number;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  tokens: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthClient(state, action: PayloadAction<AuthState['tokens']>) {
      state.isLoggedIn = true;
      state.tokens = action.payload;
    },
    clearAuthClient(state) {
      state.isLoggedIn = false;
      state.tokens = null;
    },
  },
});

export const { setAuthClient, clearAuthClient } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState }; // Export AuthState