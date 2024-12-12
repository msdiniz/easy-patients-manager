import React from 'react';
import { DetailedPatient } from '../models/Patient';
import './PatientForm.css'; // Import the CSS file

interface PatientFormProps {
  patient: DetailedPatient;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({ patient, onChange, onSave, onCancel, isFormValid }) => {
  console.log('Patient received by form:', patient);
  return (
    <form className="patient-form">
      <div className="form-group">
        <label>Full Name:</label>
        <input type="text" name="fullName" value={patient.fullName} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>DOB:</label>
        <input type="date" name="dob" value={patient.dob} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <input type="text" name="gender" value={patient.gender} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>CPF:</label>
        <input type="text" name="cpf" value={patient.cpf} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Blood Type:</label>
        <input type="text" name="bloodType" value={patient.bloodType} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Rh Factor:</label>
        <input type="text" name="rhFactor" value={patient.rhFactor} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Ethnic Group:</label>
        <input type="text" name="ethnicGroup" value={patient.ethnicGroup} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Bookmark:</label>
        <input type="text" name="bookmark" value={patient.bookmark} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Observation:</label>
        <textarea name="observation" value={patient.observation} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Notes:</label>
        <textarea name="notes" value={patient.notes} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>How Patient Was Referred:</label>
        <input type="text" name="howPatientWasReferred" value={patient.howPatientWasReferred} onChange={onChange} />
      </div>
      <div className="form-group">
        <label>Date of First Contact:</label>
        <input type="date" name="dateOfFirstContact" value={patient.dateOfFirstContact} onChange={onChange} />
      </div>
      <div className="button-container">
        <button type="button" onClick={onSave} disabled={!isFormValid}>Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};