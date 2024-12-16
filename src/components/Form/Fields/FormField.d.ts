import React from 'react';
interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    error?: string;
    placeholder?: string;
}
declare const FormField: React.FC<FormFieldProps>;
export default FormField;
