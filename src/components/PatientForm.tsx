import React from 'react';
import { DetailedPatient } from '../models/PatientModels';
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
        <label htmlFor="fullName">Full Name:</label>
        <input id="fullName" type="text" name="fullName" value={patient.fullName} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="dob">DOB:</label>
        <input id="dob" type="date" name="dob" value={patient.dob} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <input id="gender" type="text" name="gender" value={patient.gender} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="cpf">CPF:</label>
        <input id="cpf" type="text" name="cpf" value={patient.cpf} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="bloodType">Blood Type:</label>
        <input id="bloodType" type="text" name="bloodType" value={patient.bloodType} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="rhFactor">Rh Factor:</label>
        <input id="rhFactor" type="text" name="rhFactor" value={patient.rhFactor} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="ethnicGroup">Ethnic Group:</label>
        <input id="ethnicGroup" type="text" name="ethnicGroup" value={patient.ethnicGroup} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="bookmark">Bookmark:</label>
        <input id="bookmark" type="text" name="bookmark" value={patient.bookmark} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="observation">Observation:</label>
        <textarea id="observation" name="observation" value={patient.observation} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" name="notes" value={patient.notes} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="howPatientWasReferred">How Patient Was Referred:</label>
        <input id="howPatientWasReferred" type="text" name="howPatientWasReferred" value={patient.howPatientWasReferred} onChange={onChange} />
      </div>
      <div className="form-group">
        <label htmlFor="dateOfFirstContact">Date of First Contact:</label>
        <input id="dateOfFirstContact" type="date" name="dateOfFirstContact" value={patient.dateOfFirstContact} onChange={onChange} />
      </div>
      <div className="button-container">
        <button type="button" onClick={onSave} disabled={!isFormValid}>Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};