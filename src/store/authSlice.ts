import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tokens } from '../types/types';

export interface AuthState {
  isLoggedIn: boolean;
  tokens: Tokens | null;
  userName: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  tokens: null,
  userName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthClient(state, action: PayloadAction<{ tokens: Tokens; userName: string }>) {
      console.log('setAuthClient reducer called with:', action.payload);
      state.isLoggedIn = true;
      state.tokens = action.payload.tokens;
      state.userName = action.payload.userName;
    },
    clearAuthClient(state) {
      console.log('clearAuthClient reducer called');
      state.isLoggedIn = false;
      state.tokens = null;
      state.userName = null;
    },
  },
});

export const { setAuthClient, clearAuthClient } = authSlice.actions;
export default authSlice.reducer;
