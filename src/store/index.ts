import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '../models/PatientModels';

interface PatientState {
  selectedPatient: Patient | null;
  patients: Patient[];
  isEditing: boolean;
  isAdding: boolean;
  isTogglingDelete: boolean;
  showDeleted: boolean; // New state to track whether to show deleted patients
}

const initialState: PatientState = {
  selectedPatient: null,
  patients: [],
  isEditing: false,
  isAdding: false,
  isTogglingDelete: false,
  showDeleted: false, // Initialize the new state
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setSelectedPatient(state, action: PayloadAction<Patient | null>) {
      state.selectedPatient = action.payload;
    },
    setPatients(state, action: PayloadAction<Patient[]>) {
      state.patients = action.payload;
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
    setIsAdding(state, action: PayloadAction<boolean>) {
      state.isAdding = action.payload;
    },
    setIsTogglingDelete(state, action: PayloadAction<boolean>) {
      state.isTogglingDelete = action.payload;
    },
    setShowDeleted(state, action: PayloadAction<boolean>) {
      state.showDeleted = action.payload;
    },
  },
});

export const { setSelectedPatient, setPatients, setIsEditing, setIsAdding, setIsTogglingDelete, setShowDeleted } = patientSlice.actions;

export const selectPatientDeletedState = (state: PatientState, patientId: string): boolean => {
  const patient = state.patients.find(p => p.id === patientId);
  return patient ? patient.deleted || false : false;
};

const store = configureStore({
  reducer: patientSlice.reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type { PatientState }; // Ensure PatientState is exported
