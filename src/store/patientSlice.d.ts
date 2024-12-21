import { Patient } from '../models/PatientModels';
export type PatientState = {
    selectedPatient: Patient | null;
    patients: Patient[];
    isEditing: boolean;
    isAdding: boolean;
    isTogglingDelete: boolean;
    showDeleted: boolean;
};
export declare const setSelectedPatient: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient | null, "patient/setSelectedPatient">, setPatients: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient[], "patient/setPatients">, setIsEditing: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsEditing">, setIsAdding: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsAdding">, setIsTogglingDelete: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsTogglingDelete">, setShowDeleted: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setShowDeleted">;
export declare const selectPatientDeletedState: (state: PatientState, patientId: string) => boolean;
declare const _default: import("redux").Reducer<PatientState>;
export default _default;
