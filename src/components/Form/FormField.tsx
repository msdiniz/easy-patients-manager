import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
  <div className="form-field">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? 'error' : ''}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default FormField;