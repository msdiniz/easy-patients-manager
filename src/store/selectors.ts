import { createSelector } from 'reselect';
import { RootState } from '../store';
import { transformToDetailedPatient } from '../utils/transformPatient';
import { Patient } from '../models/PatientModels';

const selectPatientState = (state: RootState) => state.patient;

const selectPatients = createSelector(
  [selectPatientState],
  (patientState) => patientState.patients
);

const selectSelectedPatient = createSelector(
  [selectPatientState],
  (patientState) => patientState.selectedPatient
);

const selectIsEditing = createSelector(
  [selectPatientState],
  (patientState) => patientState.isEditing
);

const selectIsAdding = createSelector(
  [selectPatientState],
  (patientState) => patientState.isAdding
);

const selectIsTogglingDelete = createSelector(
  [selectPatientState],
  (patientState) => patientState.isTogglingDelete
);

const selectShowDeleted = createSelector(
  [selectPatientState],
  (patientState) => patientState.showDeleted
);

export const getPatients = createSelector([selectPatients], (patients: Patient[]) => 
  patients.map((patient: Patient) => transformToDetailedPatient(patient))
);

export const getSelectedPatient = createSelector([selectSelectedPatient], (selectedPatient: Patient | null) => selectedPatient);
export const getIsEditing = createSelector([selectIsEditing], (isEditing: boolean) => isEditing);
export const getIsAdding = createSelector([selectIsAdding], (isAdding: boolean) => isAdding);
export const getIsTogglingDelete = createSelector([selectIsTogglingDelete], (isTogglingDelete: boolean) => isTogglingDelete);
export const getShowDeleted = createSelector([selectShowDeleted], (showDeleted: boolean) => showDeleted); // Add selector for showDeleted