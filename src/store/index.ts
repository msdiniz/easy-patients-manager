import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice';
import apiDataSourceReducer, { ApiDataSourceState } from './apiDataSourceSlice';
import patientReducer, { PatientState } from './patientSlice';

const rootReducer = {
  patient: patientReducer,
  auth: authReducer,
  apiDataSource: apiDataSourceReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { PatientState, ApiDataSourceState, AuthState }; // Ensure all necessary types are exported