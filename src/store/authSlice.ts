import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tokens } from '../types/types';

interface AuthState {
  isLoggedIn: boolean;
  tokens: Tokens | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  tokens: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthClient(state, action: PayloadAction<Tokens>) {
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
