import React from 'react';
import { PatientDetails } from '../models/Patient';
import './PatientInfo.css'; // Import the CSS file

interface PatientInfoProps {
  patient: PatientDetails;
  onEdit: () => void;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient, onEdit }) => {
  return (
    <div className="patient-info">
      <h2>{patient.fullName}</h2>
      <p>DOB: {patient.dob}</p>
      <p>Gender: {patient.gender}</p>
      <p>CPF: {patient.cpf}</p>
      <p>Blood Type: {patient.bloodType}</p>
      <p>Rh Factor: {patient.rhFactor}</p>
      <p>Ethnic Group: {patient.ethnicGroup}</p>
      <p>Bookmark: {patient.bookmark}</p>
      <p>Observation: {patient.observation}</p>
      <p>Notes: {patient.notes}</p>
      <p>How Patient Was Referred: {patient.howPatientWasReferred}</p>
      <p>Date of First Contact: {patient.dateOfFirstContact}</p>
      <button type="button" onClick={onEdit}>Edit</button>
    </div>
  );
};