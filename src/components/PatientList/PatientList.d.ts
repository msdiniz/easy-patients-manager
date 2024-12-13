import React from 'react';
import { DetailedPatient } from '../../models/PatientModels';
import './PatientList.css';
interface PatientListProps {
    onSelectPatient: (patient: DetailedPatient | null) => void;
    selectedPatientId: string | null;
    patients: DetailedPatient[];
}
export declare const PatientList: React.FC<PatientListProps>;
export {};
