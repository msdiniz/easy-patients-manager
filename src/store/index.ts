import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice';
import authUserReducer, { AuthUserState } from './authUserSlice'; // Import the new slice and its type
import apiDataSourceReducer, { ApiDataSourceState } from './apiDataSourceSlice';
import patientReducer, { PatientState } from './patientSlice';

const rootReducer = {
  patient: patientReducer,
  auth: authReducer,
  authUser: authUserReducer, // Add the new slice to the root reducer
  apiDataSource: apiDataSourceReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { PatientState, ApiDataSourceState, AuthState, AuthUserState }; // Ensure all necessary types are exported