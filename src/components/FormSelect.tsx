import React from 'react';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
  multiple?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, onChange, options, error, multiple = false }) => (
  <div className="form-group">
    <label>{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'error' : ''}
      multiple={multiple}
    >
      <option value="">Select</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default FormSelect;