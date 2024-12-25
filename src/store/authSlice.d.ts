import { Tokens } from '../types/types';
export interface AuthState {
    isLoggedIn: boolean;
    tokens: Tokens | null;
    userName: string | null;
}
export declare const setAuthClient: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    tokens: Tokens;
    userName: string;
}, "auth/setAuthClient">, clearAuthClient: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearAuthClient">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
