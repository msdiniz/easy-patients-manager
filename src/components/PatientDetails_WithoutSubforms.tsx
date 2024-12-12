// src/components/PatientDetails.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../models/Patient';
import './PatientDetails.css'; // Import the CSS file

interface Props {
  patient: Patient | null;
}

export const PatientDetails: React.FC<Props> = ({ patient }) => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (patient) {
      const savedPatient = localStorage.getItem(`patient_${patient.id}`);
      if (savedPatient) {
        setPatientDetails(JSON.parse(savedPatient));
      } else {
        axios.get(`/data/patients/${patient.fullName}_${patient.id}.json`).then(response => {
          setPatientDetails(response.data);
        });
      }
      setIsEditing(false); // Reset edit mode when a new patient is selected
    }
  }, [patient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleSave = () => {
    if (patientDetails) {
      // Simulate saving to JSON file by updating local storage
      localStorage.setItem(`patient_${patientDetails.id}`, JSON.stringify(patientDetails));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!patientDetails) {
    return <div className="patient-details">Select a patient to view details</div>;
  }

  return (
    <div className="patient-details">
      {isEditing ? (
        <form className="patient-form">
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" name="fullName" value={patientDetails.fullName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>DOB:</label>
            <input type="date" name="dob" value={patientDetails.dob} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input type="text" name="gender" value={patientDetails.gender} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>CPF:</label>
            <input type="text" name="cpf" value={patientDetails.cpf} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Blood Type:</label>
            <input type="text" name="bloodType" value={patientDetails.bloodType} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Rh Factor:</label>
            <input type="text" name="rhFactor" value={patientDetails.rhFactor} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Ethnic Group:</label>
            <input type="text" name="ethnicGroup" value={patientDetails.ethnicGroup} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Bookmark:</label>
            <input type="text" name="bookmark" value={patientDetails.bookmark} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Observation:</label>
            <textarea name="observation" value={patientDetails.observation} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea name="notes" value={patientDetails.notes} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>How Patient Was Referred:</label>
            <input type="text" name="howPatientWasReferred" value={patientDetails.howPatientWasReferred} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Date of First Contact:</label>
            <input type="date" name="dateOfFirstContact" value={patientDetails.dateOfFirstContact} onChange={handleInputChange} />
          </div>
          <div className="button-container">
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="patient-info">
          <h2>{patientDetails.fullName}</h2>
          <p>DOB: {patientDetails.dob}</p>
          <p>Gender: {patientDetails.gender}</p>
          <p>CPF: {patientDetails.cpf}</p>
          <p>Blood Type: {patientDetails.bloodType}</p>
          <p>Rh Factor: {patientDetails.rhFactor}</p>
          <p>Ethnic Group: {patientDetails.ethnicGroup}</p>
          <p>Bookmark: {patientDetails.bookmark}</p>
          <p>Observation: {patientDetails.observation}</p>
          <p>Notes: {patientDetails.notes}</p>
          <p>How Patient Was Referred: {patientDetails.howPatientWasReferred}</p>
          <p>Date of First Contact: {patientDetails.dateOfFirstContact}</p>
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button>CreateLocalFolder</button>
    </div>
  );
};