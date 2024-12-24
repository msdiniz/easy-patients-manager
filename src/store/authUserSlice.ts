import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUserState {
  isLoggedIn: boolean;
  userName: string | null;
  roles: string[];
}

const initialState: AuthUserState = {
  isLoggedIn: false,
  userName: null,
  roles: [],
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<{ userName: string; roles: string[] }>) {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.roles = action.payload.roles;
    },
    clearAuthUser(state) {
      state.isLoggedIn = false;
      state.userName = null;
      state.roles = [];
    },
  },
});

export const { setAuthUser, clearAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;