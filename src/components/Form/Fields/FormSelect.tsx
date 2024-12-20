import React from 'react';
import { Bookmark } from '../../../models/PatientModels';
import styles from '../PatientForm.module.css'; // Import the CSS module

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

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, options, onChange, error, multiple, className = '' }) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.select} ${error ? styles.selectError : ''}`}
        multiple={multiple}
      >
        {options.map(option => {
          if (typeof option === 'string') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default FormSelect;