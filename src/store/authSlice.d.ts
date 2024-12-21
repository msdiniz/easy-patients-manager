interface AuthState {
    isLoggedIn: boolean;
    authClient: gapi.auth2.GoogleUser | null;
}
export declare const setAuthClient: import("@reduxjs/toolkit").ActionCreatorWithPayload<gapi.auth2.GoogleUser, "auth/setAuthClient">, clearAuthClient: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearAuthClient">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
export type { AuthState };
