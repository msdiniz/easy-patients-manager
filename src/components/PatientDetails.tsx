// src/components/PatientDetails.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Patient } from '../models/Patient';
import { PatientForm } from './PatientForm';
import { PatientInfo } from './PatientInfo';
import './PatientDetails.css'; // Import the CSS file

interface Props {
  patient: Patient | null;
  onSaveNewPatient: (patient: Patient) => void;
}

export const PatientDetails: React.FC<Props> = ({ patient, onSaveNewPatient }) => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (patient) {
      if (patient.id) {
        const savedPatient = localStorage.getItem(`patient_${patient.id}`);
        if (savedPatient) {
          setPatientDetails(JSON.parse(savedPatient));
        } else {
          axios.get(`/data/patients/${patient.fullName}_${patient.id}.json`).then(response => {
            setPatientDetails(response.data);
          });
        }
        setIsEditing(false); // Ensure we start in view mode for existing patients
      } else {
        setPatientDetails(patient);
        setIsEditing(true); // Start in edit mode for new patients
      }
    }
  }, [patient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleSave = () => {
    if (patientDetails) {
      if (patientDetails.id) {
        // Simulate saving to JSON file by updating local storage
        localStorage.setItem(`patient_${patientDetails.id}`, JSON.stringify(patientDetails));
      } else {
        // Save new patient
        onSaveNewPatient(patientDetails);
      }
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPatientDetails(patient);
  };

  if (!patientDetails) {
    return <div className="patient-details">Select a patient to view details</div>;
  }

  const isFormValid = patientDetails.fullName && patientDetails.gender && patientDetails.dob && new Date(patientDetails.dob) < new Date();

  return (
    <div className="patient-details">
      {isEditing ? (
        <PatientForm
          patient={patientDetails}
          onChange={handleInputChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isFormValid={isFormValid}
        />
      ) : (
        <PatientInfo
          patient={patientDetails}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};
