import { Dispatch } from 'redux';
export declare const handleAuthMessage: (event: MessageEvent, dispatch: Dispatch<any>) => void;
export declare const fetchAuthUrl: (backendPort: number) => Promise<any>;
export declare const authenticateUser: (email: string, password: string) => Promise<{
    fullName: string;
    roles: string[];
    dob: string;
    gender: string;
    emails: string[];
    addresses: string[];
    phones: string[];
    specialties: string[];
    password: string;
}>;
