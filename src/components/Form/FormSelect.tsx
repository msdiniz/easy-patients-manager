import React from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  value: string | string[];
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  multiple?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, options, onChange, error, multiple = false }) => (
  <div className="form-field">
    <label htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      value={multiple ? (Array.isArray(value) ? value : [value]) : value}
      onChange={onChange}
      className={error ? 'error' : ''}
      multiple={multiple}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default FormSelect;
