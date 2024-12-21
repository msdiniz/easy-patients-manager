import React from 'react';
import { Bookmark } from '../../../models/PatientModels';
interface FormSelectProps {
    label: string;
    name: string;
    value: string | string[];
    options: string[] | Bookmark[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    multiple?: boolean;
    className?: string;
}
declare const FormSelect: React.FC<FormSelectProps>;
export default FormSelect;
