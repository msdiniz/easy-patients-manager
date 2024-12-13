import React from 'react';

interface FormButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onSave, onCancel, isFormValid }) => (
  <div className="button-container">
    <button type="button" onClick={onSave} disabled={!isFormValid} className={!isFormValid ? 'disabled' : ''}>Save</button>
    <button type="button" onClick={onCancel}>Cancel</button>
  </div>
);

export default FormButtons;