import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/UserModels'; 
// export interface User {
//   id: string;
//   fullName: string;
//   emails: string[];
//   roles: string[];
// }

export interface AuthUserState {
  isLoggedIn: boolean;
  userName: string | null;
  roles: string[];
  selectedPhysicianId: string | null;
  users: User[]; // Add users property
  physicians: User[]; // Add physicians property
}

const initialState: AuthUserState = {
  isLoggedIn: false,
  userName: null,
  roles: [],
  selectedPhysicianId: null,
  users: [], // Initialize users
  physicians: [], // Initialize physicians
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
      state.selectedPhysicianId = null;
      state.users = []; // Clear users
      state.physicians = []; // Clear physicians
    },
    setSelectedPhysician(state, action: PayloadAction<string>) {
      state.selectedPhysicianId = action.payload;
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setPhysicians(state, action: PayloadAction<User[]>) {
      state.physicians = action.payload;
    },
  },
});

export const { setAuthUser, clearAuthUser, setSelectedPhysician, setUsers, setPhysicians } = authUserSlice.actions;
export default authUserSlice.reducer;
