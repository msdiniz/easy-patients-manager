import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PatientInfo from './PatientInfo'; // Ensure the default import is used
import PatientForm from './Form/PatientForm';
import { getIsEditing, getIsAdding } from '../store/selectors';
import { setIsEditing, setSelectedPatient, setIsAdding } from '../store/index';
import { DetailedPatient } from '../models/PatientModels';
import { PatientUtils } from '../models/PatientUtils';

interface PatientDetailsProps {
  patientId: string;
  fullName: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId, fullName }) => {
  const dispatch = useDispatch();
  const [patient, setPatient] = useState<DetailedPatient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isEditing = useSelector(getIsEditing);
  const isAdding = useSelector(getIsAdding);  

  useEffect(() => {
    if (patientId && fullName) {
      const storedDetailedPatients = localStorage.getItem('detailedPatients');
      if (storedDetailedPatients) {
        const parsedDetailedPatients: DetailedPatient[] = JSON.parse(storedDetailedPatients);
        const foundPatient = parsedDetailedPatients.find(p => p.id === patientId);
        if (foundPatient) {
          setPatient(foundPatient);
          dispatch(setSelectedPatient(foundPatient));
          return;
        }
      }

      fetch(`/data/patients/${fullName}_${patientId}.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: DetailedPatient) => {
          setPatient(data);
          dispatch(setSelectedPatient(data));
        })
        .catch(error => {
          console.error('Error loading detailed patient:', error);
          setError('Failed to load patient details. Please try again later.');
        });
    }
  }, [patientId, fullName, dispatch]);

  const handleEdit = () => {
    dispatch(setIsEditing(true));
    console.log('onEdit called');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (patient) {
      const { name, value } = e.target;
      setPatient({ ...patient, [name]: value });
      dispatch(setSelectedPatient({ ...patient, [name]: value }));
    }
  };

  const handleSave = () => {
    if (patient) {
      const storedDetailedPatients = localStorage.getItem('detailedPatients');
      const parsedDetailedPatients: DetailedPatient[] = storedDetailedPatients ? JSON.parse(storedDetailedPatients) : [];

      const updatedDetailedPatients = parsedDetailedPatients.map(p => p.id === patient.id ? patient : p);
      if (!parsedDetailedPatients.some(p => p.id === patient.id)) {
        updatedDetailedPatients.push(patient);
      }

      localStorage.setItem('detailedPatients', JSON.stringify(updatedDetailedPatients)); // Persist to local storage
      dispatch(setIsEditing(false));
      dispatch(setIsAdding(false));
      console.log('Patient saved:', patient);
    }
  };

  const handleCancel = () => {
    dispatch(setIsEditing(false));
    dispatch(setSelectedPatient(null));
  };

  const isFormValid = patient !== null &&
    PatientUtils.isValidName(patient.fullName.trim()) &&
    new Date(patient.dob) < new Date() &&
    patient.gender !== '' &&
    new Date(patient.dateOfFirstContact) < new Date();

  if (!patientId || !fullName) {
    return <div>No patient selected</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="patient-details">
      {isEditing || isAdding ? (
        <PatientForm
          patient={patient}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isFormValid={isFormValid}
        />
      ) : (
        <PatientInfo
          patient={patient}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default PatientDetails;
