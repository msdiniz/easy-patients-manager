import React from 'react';
import { DetailedPatient } from '../models/PatientModels';
import './PatientInfo.css';
interface PatientInfoProps {
    patient: DetailedPatient;
    onEdit: () => void;
}
export declare const PatientInfo: React.FC<PatientInfoProps>;
export {};
