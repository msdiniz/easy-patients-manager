import { createSelector } from 'reselect';
import { RootState } from '../store';
import { transformToDetailedPatient } from '../utils/transformPatient';
import { Patient } from '../models/PatientModels';

const selectPatientState = (state: RootState) => state.patient;
const selectAuthUserState = (state: RootState) => state.authUser;

export const selectUsers = createSelector(
  [selectAuthUserState],
  (authUserState) => authUserState.users
);

export const selectPhysicians = createSelector(
  [selectAuthUserState],
  (authUserState) => authUserState.physicians
);

const selectPatientsLocal = createSelector(
  [selectPatientState],
  (patientState) => patientState.patientsLocal || [] // Ensure patientsLocal is an array
);

const selectPatientsGoogle = createSelector(
  [selectPatientState],
  (patientState) => patientState.patientsGoogle || [] // Ensure patientsGoogle is an array
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

export const getPatientsLocal = createSelector([selectPatientsLocal], (patients: Patient[]) => 
  patients.map((patient: Patient) => transformToDetailedPatient(patient))
);

export const getPatientsGoogle = createSelector([selectPatientsGoogle], (patients: Patient[]) => 
  patients.map((patient: Patient) => transformToDetailedPatient(patient))
);

export const getSelectedPatient = createSelector([selectSelectedPatient], (selectedPatient: Patient | null) => selectedPatient);
export const getIsEditing = createSelector([selectIsEditing], (isEditing: boolean) => isEditing);
export const getIsAdding = createSelector([selectIsAdding], (isAdding: boolean) => isAdding);
export const getIsTogglingDelete = createSelector([selectIsTogglingDelete], (isTogglingDelete: boolean) => isTogglingDelete);
export const getShowDeleted = createSelector([selectShowDeleted], (showDeleted: boolean) => showDeleted);

export const selectPatientDeletedState = (state: RootState, patientId: string): boolean => {
  const patient = state.patient.patientsLocal.find(p => p.id === patientId) || state.patient.patientsGoogle.find(p => p.id === patientId);
  return patient ? patient.deleted || false : false;
};

export const userIsPhysician = createSelector(
  [selectAuthUserState],
  (authUserState) => authUserState.roles.includes('physician')
);
