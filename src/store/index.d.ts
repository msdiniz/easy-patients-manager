import { Patient } from '../models/PatientModels';
interface PatientState {
    selectedPatient: Patient | null;
    patients: Patient[];
    isEditing: boolean;
    isAdding: boolean;
    isTogglingDelete: boolean;
}
export declare const setSelectedPatient: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient | null, "patient/setSelectedPatient">, setPatients: import("@reduxjs/toolkit").ActionCreatorWithPayload<Patient[], "patient/setPatients">, setIsEditing: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsEditing">, setIsAdding: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsAdding">, setIsTogglingDelete: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "patient/setIsTogglingDelete">;
export declare const selectPatientDeletedState: (state: PatientState, patientId: string) => boolean;
declare const store: import("@reduxjs/toolkit").EnhancedStore<PatientState, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<PatientState, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type { PatientState };
