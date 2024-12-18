import { createSelector } from 'reselect';
import { RootState } from '../store';
import { transformToDetailedPatient } from '../utils/transformPatient';
import { Patient } from '../models/PatientModels';

const selectPatients = (state: RootState) => state.patients;
const selectSelectedPatient = (state: RootState) => state.selectedPatient;
const selectIsEditing = (state: RootState) => state.isEditing;
const selectIsAdding = (state: RootState) => state.isAdding;
const selectIsTogglingDelete = (state: RootState) => state.isTogglingDelete;
const selectShowDeleted = (state: RootState) => state.showDeleted; // Add selector for showDeleted

export const getPatients = createSelector([selectPatients], (patients: Patient[]) => 
  patients.map((patient: Patient) => transformToDetailedPatient(patient))
);

export const getSelectedPatient = createSelector([selectSelectedPatient], (selectedPatient: Patient | null) => selectedPatient);
export const getIsEditing = createSelector([selectIsEditing], (isEditing: boolean) => isEditing);
export const getIsAdding = createSelector([selectIsAdding], (isAdding: boolean) => isAdding);
export const getIsTogglingDelete = createSelector([selectIsTogglingDelete], (isTogglingDelete: boolean) => isTogglingDelete);
export const getShowDeleted = createSelector([selectShowDeleted], (showDeleted: boolean) => showDeleted); // Add selector for showDeleted
