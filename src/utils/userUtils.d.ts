import { User } from '../models/UserModels';
export declare const fetchUsers: () => Promise<User[]>;
export declare const fetchPhysicians: () => Promise<User[]>;
export declare const fetchUsersNotPhysicians: () => Promise<User[]>;
