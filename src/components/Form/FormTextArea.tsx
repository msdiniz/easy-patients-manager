import React from 'react';

interface FormTextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  maxLength?: number;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ label, name, value, onChange, error, maxLength }) => (
  <div className="form-group">
    <label>{label}:</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'error' : ''}
      maxLength={maxLength}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default FormTextArea;