import { User } from '../models/UserModels';
export interface AuthUserState {
    isLoggedIn: boolean;
    userName: string | null;
    roles: string[];
    selectedPhysicianId: string | null;
    users: User[];
    physicians: User[];
}
export declare const setAuthUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    userName: string;
    roles: string[];
}, "authUser/setAuthUser">, clearAuthUser: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"authUser/clearAuthUser">, setSelectedPhysician: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "authUser/setSelectedPhysician">, setUsers: import("@reduxjs/toolkit").ActionCreatorWithPayload<User[], "authUser/setUsers">, setPhysicians: import("@reduxjs/toolkit").ActionCreatorWithPayload<User[], "authUser/setPhysicians">;
declare const _default: import("redux").Reducer<AuthUserState>;
export default _default;
