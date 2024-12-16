import React from 'react';
import { DetailedPatient, Bookmark, Email, Address, Phone } from '../../models/PatientModels';
import './PatientForm.css';
interface PatientFormProps {
    patient: DetailedPatient;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | CustomChangeEvent) => void;
    onSave: () => void;
    onCancel: () => void;
    isFormValid: boolean;
}
interface CustomChangeEvent {
    target: {
        name: string;
        value: Email[] | Address[] | Phone[] | Bookmark[];
    };
}
declare const PatientForm: React.FC<PatientFormProps>;
export default PatientForm;
