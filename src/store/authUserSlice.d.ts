export interface AuthUserState {
    isLoggedIn: boolean;
    userName: string | null;
    roles: string[];
}
export declare const setAuthUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userName: string;
    roles: string[];
}, "authUser/setAuthUser">, clearAuthUser: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"authUser/clearAuthUser">;
declare const _default: import("redux").Reducer<AuthUserState>;
export default _default;
