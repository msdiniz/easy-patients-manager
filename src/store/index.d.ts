import { AuthState } from './authSlice';
import { AuthUserState } from './authUserSlice';
import { ApiDataSourceState } from './apiDataSourceSlice';
import { PatientState } from './patientSlice';
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    patient: PatientState;
    auth: AuthState;
    authUser: AuthUserState;
    apiDataSource: ApiDataSourceState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        patient: PatientState;
        auth: AuthState;
        authUser: AuthUserState;
        apiDataSource: ApiDataSourceState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { PatientState, ApiDataSourceState, AuthState, AuthUserState };
