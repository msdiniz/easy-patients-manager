import React, { useState, useEffect } from 'react';
import { PatientDetails } from '../../models/PatientModels';
import { PatientUtils } from '../../models/PatientUtils';
import FormField from './FormField';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
import FormButtons from './FormButtons';
import './PatientForm.css'; // Ensure the CSS file is imported

interface PatientFormProps {
  patient: PatientDetails;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onChange, onSave, onCancel, isFormValid }) => {
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
      <FormField
        label="Full Name"
        name="fullName"
        value={patient.fullName}
        onChange={handleChange}
        error={errors.fullName}
      />
      <FormField
        label="Date of Birth"
        name="dob"
        type="date"
        value={patient.dob}
        onChange={handleChange}
        error={errors.dob}
      />
      <FormSelect
        label="Gender"
        name="gender"
        value={patient.gender}
        options={options.genders || []}
        onChange={handleChange}
        error={errors.gender}
      />
      <FormField
        label="CPF"
        name="cpf"
        value={patient.cpf}
        onChange={handleChange}
        error={errors.cpf}
        placeholder="ddd.ddd.ddd-dd"
      />
      <FormSelect
        label="Blood Type"
        name="bloodType"
        value={patient.bloodType}
        options={options.bloodTypes || []}
        onChange={handleChange}
      />
      <FormSelect
        label="Rh Factor"
        name="rhFactor"
        value={patient.rhFactor}
        options={options.rhFactors || []}
        onChange={handleChange}
      />
      <FormSelect
        label="Ethnic Group"
        name="ethnicGroup"
        value={patient.ethnicGroup}
        options={options.ethnicGroups || []}
        onChange={handleChange}
      />
      <FormTextArea
        label="Observation"
        name="observation"
        value={patient.observation}
        onChange={handleChange}
      />
      <FormTextArea
        label="Notes"
        name="notes"
        value={patient.notes}
        onChange={handleChange}
      />
      <FormTextArea
        label="How Patient Was Referred"
        name="howPatientWasReferred"
        value={patient.howPatientWasReferred}
        onChange={handleChange}
        maxLength={300}
      />
      <FormField
        label="Date of First Contact"
        name="dateOfFirstContact"
        type="date"
        value={patient.dateOfFirstContact}
        onChange={handleChange}
      />
      <FormSelect
        label="Bookmark/Tag"
        name="bookmark"
        value={patient.bookmark}
        options={options.bookmarks || []}
        onChange={handleChange}
        multiple
      />
      <FormButtons onSave={onSave} onCancel={onCancel} isFormValid={isFormValid} />
    </form>
  );
};

export default PatientForm;