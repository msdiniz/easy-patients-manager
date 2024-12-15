import React from 'react';
import { DetailedPatient } from '../models/PatientModels';
import './PatientInfo.css'; // Import the CSS file

interface PatientInfoProps {
  patient: DetailedPatient | null;
  onEdit: () => void;
  onDeleteToggle: () => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient, onEdit, onDeleteToggle }) => {
  if (!patient) {
    return <div>No patient selected</div>;
  }
  return (
    <div className="patient-info">
      <h2>{patient.fullName}</h2>
      <p><strong>Date of Birth:</strong> {patient.dob}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>CPF:</strong> {patient.cpf}</p>
      <p><strong>Blood Type:</strong> {patient.bloodType}</p>
      <p><strong>Rh Factor:</strong> {patient.rhFactor}</p>
      <p><strong>Ethnic Group:</strong> {patient.ethnicGroup}</p>
      <p><strong>Observation:</strong> {patient.observation}</p>
      <p><strong>Notes:</strong> {patient.notes}</p>
      <p><strong>How Patient Was Referred:</strong> {patient.howPatientWasReferred}</p>
      <p><strong>Date of First Contact:</strong> {patient.dateOfFirstContact}</p>
      <p><strong>Bookmarks:</strong> {patient.bookmarks ? patient.bookmarks.map(b => b.name).join(', ') : 'None'}</p>
      {!patient.deleted && <button onClick={onEdit}>Edit</button>}
      <button onClick={onDeleteToggle} style={{ marginLeft: '10px' }}>
        {patient.deleted ? 'Undelete' : 'Delete'}
      </button>
    </div>
  );
};

export default React.memo(PatientInfo);