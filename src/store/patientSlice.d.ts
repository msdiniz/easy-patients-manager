import { Patient } from '../models/PatientModels';
export type PatientState = {
    selectedPatient: Patient | null;
    patientsLocal: Patient[];
    patientsGoogle: Patient[];
    isEditing: boolean;
    isAdding: boolean;
    isTogglingDelete: boolean;
    showDeleted: boolean;
};
export declare const setSelectedPatient: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient | null, "patient/setSelectedPatient">, setPatientsLocal: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient[], "patient/setPatientsLocal">, setPatientsGoogle: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient[], "patient/setPatientsGoogle">, setIsEditing: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsEditing">, setIsAdding: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsAdding">, setIsTogglingDelete: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsTogglingDelete">, setShowDeleted: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setShowDeleted">;
declare const _default: import("redux").Reducer<PatientState>;
export default _default;
