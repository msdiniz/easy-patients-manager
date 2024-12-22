import { Tokens } from '../types/types';
interface AuthState {
    isLoggedIn: boolean;
    tokens: Tokens | null;
}
export declare const setAuthClient: import("@reduxjs/toolkit").ActionCreatorWithPayload<Tokens, "auth/setAuthClient">, clearAuthClient: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearAuthClient">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
export type { AuthState };
