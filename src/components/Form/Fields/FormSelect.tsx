import React from 'react';
import { Bookmark } from '../../../models/PatientModels';

interface FormSelectProps {
  label: string;
  name: string;
  value: string | string[];
  options: string[] | Bookmark[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  multiple?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, options, onChange, error, multiple }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${error ? 'is-invalid' : ''}`}
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
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormSelect;