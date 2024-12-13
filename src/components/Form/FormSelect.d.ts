import React from 'react';
interface FormSelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    error?: string;
    multiple?: boolean;
}
declare const FormSelect: React.FC<FormSelectProps>;
export default FormSelect;
