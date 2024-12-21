import { AuthState } from './authSlice';
import { ApiDataSourceState } from './apiDataSourceSlice';
import { PatientState } from './patientSlice';
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    patient: PatientState;
    auth: AuthState;
    apiDataSource: ApiDataSourceState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        patient: PatientState;
        auth: AuthState;
        apiDataSource: ApiDataSourceState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { PatientState, ApiDataSourceState, AuthState };
