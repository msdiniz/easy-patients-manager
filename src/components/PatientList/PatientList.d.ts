import React from 'react';
import { Patient } from '../../models/PatientModels';
import './PatientList.css';
interface PatientListProps {
    onSelectPatient: (patientId: string, fullName: string) => void;
    selectedPatientId: string | null;
    patients: Patient[];
}
export declare const PatientList: React.FC<PatientListProps>;
export {};
