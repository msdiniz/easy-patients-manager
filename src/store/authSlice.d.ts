import { OAuth2Client } from 'google-auth-library';
export type AuthState = {
    authClient: OAuth2Client | null;
    isLoggedIn: boolean;
};
export declare const setAuthClient: import("@reduxjs/toolkit").ActionCreatorWithPayload<OAuth2Client, "auth/setAuthClient">, clearAuthClient: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearAuthClient">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
