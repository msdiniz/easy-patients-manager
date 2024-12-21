interface AuthState {
    isLoggedIn: boolean;
    tokens: {
        access_token: string;
        refresh_token: string;
        scope: string;
        token_type: string;
        expiry_date: number;
    } | null;
}
export declare const setAuthClient: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expiry_date: number;
} | null, "auth/setAuthClient">, clearAuthClient: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearAuthClient">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
export type { AuthState };
