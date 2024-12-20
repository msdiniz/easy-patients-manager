import React from 'react';
import styles from '../PatientForm.module.css'; // Import the CSS module

interface FormTextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  maxLength?: number;
  className?: string; // Add className prop
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ label, name, value, onChange, error, maxLength, className = '' }) => (
  <div className={`${className}`}>
    <label className={styles.label}>{label}:</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
      maxLength={maxLength}
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
);

export default FormTextArea;