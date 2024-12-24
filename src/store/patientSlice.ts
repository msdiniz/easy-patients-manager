import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '../models/PatientModels';

export type PatientState = {
  selectedPatient: Patient | null;
  patientsLocal: Patient[]; // Rename to clarify
  patientsGoogle: Patient[]; // Add Google patients
  isEditing: boolean;
  isAdding: boolean;
  isTogglingDelete: boolean;
  showDeleted: boolean;
};

const initialState: PatientState = {
  selectedPatient: null,
  patientsLocal: [], // Initialize local patients
  patientsGoogle: [], // Initialize Google patients
  isEditing: false,
  isAdding: false,
  isTogglingDelete: false,
  showDeleted: false,
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setSelectedPatient(state, action: PayloadAction<Patient | null>) {
      state.selectedPatient = action.payload;
    },
    setPatientsLocal(state, action: PayloadAction<Patient[]>) {
      state.patientsLocal = action.payload;
    },
    setPatientsGoogle(state, action: PayloadAction<Patient[]>) {
      state.patientsGoogle = action.payload;
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

export const { setSelectedPatient, setPatientsLocal, setPatientsGoogle, setIsEditing, setIsAdding, setIsTogglingDelete, setShowDeleted } = patientSlice.actions;

export default patientSlice.reducer;
