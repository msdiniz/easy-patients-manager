import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, error, type = 'text', placeholder }) => (
  <div className="form-group">
    <label>{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'error' : ''}
      placeholder={placeholder}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default FormField;