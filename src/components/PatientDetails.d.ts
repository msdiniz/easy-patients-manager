import React from 'react';
import { Patient } from '../models/PatientModels';
import './PatientDetails.css';
interface Props {
    patient: Patient | null;
    onSaveNewPatient: (patient: Patient) => void;
}
export declare const PatientDetails: React.FC<Props>;
export {};
