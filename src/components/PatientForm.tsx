import React, { useState, useEffect } from 'react';
import { DetailedPatient } from '../models/PatientModels';
import { PatientUtils } from '../models/PatientUtils';
import './PatientForm.css'; // Ensure the CSS file is imported

interface PatientFormProps {
  patient: DetailedPatient;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({ patient, onChange, onSave, onCancel, isFormValid }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    fetch('/options.json')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error loading options:', error));
  }, []);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'fullName' && !PatientUtils.isValidName(value)) {
      error = 'Invalid name';
    } else if (name === 'dob') {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (dob >= today) {
        error = 'DOB must be in the past';
      } else if (age > 115) {
        error = 'Age cannot be more than 115 years';
      }
    } else if (name === 'gender' && !options.genders.includes(value)) {
      error = 'Invalid gender';
    } else if (name === 'cpf' && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) {
      error = 'Invalid CPF format';
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
    onChange(e);
  };

  return (
    <form className="patient-form">
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={patient.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={patient.dob}
          onChange={handleChange}
        />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select name="gender" value={patient.gender} onChange={handleChange}>
          <option value="">Select</option>
          {options.genders && options.genders.map((gender: string) => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}
      </div>
      <div className="form-group">
        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          value={patient.cpf}
          onChange={handleChange}
          placeholder="ddd.ddd.ddd-dd"
        />
        {errors.cpf && <span className="error">{errors.cpf}</span>}
      </div>
      <div className="form-group">
        <label>Blood Type:</label>
        <select name="bloodType" value={patient.bloodType} onChange={handleChange}>
          <option value="">Select</option>
          {options.bloodTypes && options.bloodTypes.map((type: string) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Rh Factor:</label>
        <select name="rhFactor" value={patient.rhFactor} onChange={handleChange}>
          <option value="">Select</option>
          {options.rhFactors && options.rhFactors.map((factor: string) => (
            <option key={factor} value={factor}>{factor}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Ethnic Group:</label>
        <select name="ethnicGroup" value={patient.ethnicGroup} onChange={handleChange}>
          <option value="">Select</option>
          {options.ethnicGroups && options.ethnicGroups.map((group: string) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Observation:</label>
        <textarea
          name="observation"
          value={patient.observation}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Notes:</label>
        <textarea
          name="notes"
          value={patient.notes}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>How Patient Was Referred:</label>
        <textarea
          name="howPatientWasReferred"
          value={patient.howPatientWasReferred}
          onChange={handleChange}
          maxLength={300}
        />
      </div>
      <div className="form-group">
        <label>Date of First Contact:</label>
        <input
          type="date"
          name="dateOfFirstContact"
          value={patient.dateOfFirstContact}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Bookmark/Tag:</label>
        <select name="bookmark" value={patient.bookmark} onChange={handleChange} multiple>
          {options.bookmarks && options.bookmarks.map((bookmark: string) => (
            <option key={bookmark} value={bookmark}>{bookmark}</option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button type="button" onClick={onSave} disabled={!isFormValid} className={!isFormValid ? 'disabled' : ''}>Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};