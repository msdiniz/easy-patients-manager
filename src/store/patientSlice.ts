import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '../models/PatientModels';

export type PatientState = {
  selectedPatient: Patient | null;
  patients: Patient[];
  isEditing: boolean;
  isAdding: boolean;
  isTogglingDelete: boolean;
  showDeleted: boolean;
};

const initialState: PatientState = {
  selectedPatient: null,
  patients: [],
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

export default patientSlice.reducer;
