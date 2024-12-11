// src/components/PatientDetails.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../models/Patient';

interface Props {
  patient: Patient | null;
}

export const PatientDetails: React.FC<Props> = ({ patient }) => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (patient) {
      axios.get(`/data/patients/${patient.fullName}_${patient.id}.json`).then(response => {
        setPatientDetails(response.data);
      });
    }
  }, [patient]);

  if (!patientDetails) {
    return <div className="patient-details">Select a patient to view details</div>;
  }

  return (
    <div className="patient-details">
      {isEditing ? (
        <form>
          {/* Render form fields for patient details */}
          <button type="button" onClick={() => setIsEditing(false)}>Save</button>
        </form>
      ) : (
        <div>
          <h2>{patientDetails.fullName}</h2>
          <p>DOB: {patientDetails.dob}</p>
          <p>Gender: {patientDetails.gender}</p>
          {/* Render other patient details */}
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button>CreateLocalFolder</button>
    </div>
  );
};
