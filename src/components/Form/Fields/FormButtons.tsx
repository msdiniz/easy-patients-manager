import React from 'react';
import styles from '../PatientForm.module.css'; // Import the CSS module

interface FormButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onSave, onCancel, isFormValid }) => (
  <div className={styles.buttonContainer}>
    <button type="button" onClick={onSave} disabled={!isFormValid} className={!isFormValid ? styles.disabled : ''}>Save</button>
    <button type="button" onClick={onCancel}>Cancel</button>
  </div>
);

export default FormButtons;