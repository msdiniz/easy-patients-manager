import { Patient } from '../models/PatientModels';
interface PatientState {
    selectedPatient: Patient | null;
    patients: Patient[];
    isEditing: boolean;
    isAdding: boolean;
    isTogglingDelete: boolean;
    showDeleted: boolean;
}
export declare const setSelectedPatient: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient | null, "patient/setSelectedPatient">, setPatients: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient[], "patient/setPatients">, setIsEditing: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsEditing">, setIsAdding: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsAdding">, setIsTogglingDelete: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsTogglingDelete">, setShowDeleted: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setShowDeleted">;
export declare const selectPatientDeletedState: (state: PatientState, patientId: string) => boolean;
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        patient: import("./patientSlice").PatientState;
        auth: import("./authSlice").AuthState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type { PatientState };
