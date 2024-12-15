import { Patient, DetailedPatient } from './PatientModels';
export declare class PatientFactory {
    static createNewForPatientList(fullName?: string, formatName?: boolean): Patient;
    static createNewForPatientDetail(fullName?: string, formatName?: boolean): DetailedPatient;
    private static generateUniqueId;
}
