import React from 'react';
import { PatientDetails } from '../../models/PatientModels';
import './PatientList.css';

interface PatientListProps {
    onSelectPatient: (patient: PatientDetails | null) => void;
    selectedPatientId: string | null;
    patients: PatientDetails[];
}

export declare const PatientList: React.FC<PatientListProps>;
export {};