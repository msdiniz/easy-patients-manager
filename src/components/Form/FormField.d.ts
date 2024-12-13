import React from 'react';
interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: string;
    placeholder?: string;
}
declare const FormField: React.FC<FormFieldProps>;
export default FormField;
