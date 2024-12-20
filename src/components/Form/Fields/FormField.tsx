import React from 'react';
import styles from '../PatientForm.module.css'; // Import the CSS module

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, error, type = 'text', placeholder, className = '' }) => (
  <div className={`${className}`}>
    <label htmlFor={name} className={styles.label}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${error ? styles.inputError : ''}`}
    />
    {error && <div className={styles.errorMessage}>{error}</div>}
  </div>
);

export default FormField;