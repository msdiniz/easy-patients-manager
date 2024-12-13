import React from 'react';
import { DetailedPatient } from '../models/PatientModels';
import './PatientForm.css';
interface PatientFormProps {
    patient: DetailedPatient;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSave: () => void;
    onCancel: () => void;
    isFormValid: boolean;
}
export declare const PatientForm: React.FC<PatientFormProps>;
export {};
