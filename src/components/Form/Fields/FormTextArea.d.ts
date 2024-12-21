import React from 'react';
interface FormTextAreaProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    maxLength?: number;
    className?: string;
}
declare const FormTextArea: React.FC<FormTextAreaProps>;
export default FormTextArea;
