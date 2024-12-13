import React from 'react';
interface FormButtonsProps {
    onSave: () => void;
    onCancel: () => void;
    isFormValid: boolean;
}
declare const FormButtons: React.FC<FormButtonsProps>;
export default FormButtons;
