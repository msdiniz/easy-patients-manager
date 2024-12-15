import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PatientInfo from './PatientInfo'; // Ensure the default import is used
import PatientForm from './Form/PatientForm';
import { getIsEditing, getIsAdding, getSelectedPatient } from '../store/selectors';
import { setIsEditing, setSelectedPatient, setIsAdding, setPatients, selectPatientDeletedState, RootState } from '../store/index';
import { DetailedPatient } from '../models/PatientModels';
import { PatientFactory } from '../models/PatientFactory'; // Ensure the named import is used
import { PatientUtils } from '../models/PatientUtils';
import { getPatientsFromStorage, savePatientsToStorage, getDetailedPatientsFromStorage, saveDetailedPatientsToStorage } from '../utils/patientStorage';

interface PatientDetailsProps {
  patientId: string;
  fullName: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId, fullName }) => {
  const dispatch = useDispatch();
  const selectedPatient = useSelector(getSelectedPatient) as DetailedPatient | null;
  const [patient, setPatient] = useState<DetailedPatient | null>(selectedPatient);
  const [error, setError] = useState<string | null>(null);
  const isEditing = useSelector(getIsEditing);
  const isAdding = useSelector(getIsAdding);
  const [isDirty, setIsDirty] = useState(false);
  const deleted = useSelector((state: RootState) => selectPatientDeletedState(state, patientId));

  useEffect(() => {
    console.log('isAdding:', isAdding);
    console.log('isEditing:', isEditing);
    setError(null); // Reset the error state
    if (isAdding) {
      // If adding a new patient, create a new DetailedPatient object with the same ID
      const newPatient = PatientFactory.createNewForPatientDetail(fullName, true);
      newPatient.id = patientId; // Use the passed ID
      newPatient.dateOfFirstContact = new Date().toISOString().split('T')[0]; // Default to today
      newPatient.deleted = deleted; // Set the deleted state
      console.log('New patient created:', newPatient);
      setPatient(newPatient);
      dispatch(setSelectedPatient(newPatient));
    } else if (patientId && fullName) {
      // Otherwise, fetch the patient data from local storage or JSON file
      const parsedDetailedPatients = getDetailedPatientsFromStorage();
      const foundPatient = parsedDetailedPatients.find(p => p.id === patientId);
      console.log('Found patient:', foundPatient);
      if (foundPatient) {
        foundPatient.deleted = deleted; // Set the deleted state
        setPatient(foundPatient);
        dispatch(setSelectedPatient(foundPatient));
        return;
      }

      fetch(`/data/patients/${fullName}_${patientId}.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: DetailedPatient) => {
          data.deleted = deleted; // Set the deleted state
          console.log('Fetched patient data:', data);
          setPatient(data);
          dispatch(setSelectedPatient(data));
        })
        .catch(error => {
          console.error('Error loading detailed patient:', error);
          setError('Failed to load patient details. Please try again later.');
        });
    }
  }, [patientId, fullName, deleted, isAdding, isEditing, dispatch]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const handleEdit = () => {
    dispatch(setIsEditing(true));
    console.log('onEdit called');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (patient) {
      const { name, value } = e.target;
      setPatient({ ...patient, [name]: value });
      dispatch(setSelectedPatient({ ...patient, [name]: value }));
      setIsDirty(true);
    }
  };

  const handleSave = () => {
    if (patient) {
      // Get existing detailed patients from localStorage
      const parsedDetailedPatients = getDetailedPatientsFromStorage();
      const updatedDetailedPatients = parsedDetailedPatients.filter(p => p.id !== patient.id);
      updatedDetailedPatients.push(patient);
      saveDetailedPatientsToStorage(updatedDetailedPatients); // Persist to local storage
  
      // Get existing patients from localStorage
      const parsedPatients = getPatientsFromStorage();
      const updatedPatients = parsedPatients.filter(p => p.id !== patient.id);
      updatedPatients.push({
        id: patient.id,
        fullName: patient.fullName,
        dob: patient.dob,
        gender: patient.gender,
        cpf: patient.cpf,
        dateOfFirstContact: patient.dateOfFirstContact,
        bookmarks: patient.bookmarks, // Corrected to bookmarks
        deleted: patient.deleted // Ensure the deleted field is saved
      });
      savePatientsToStorage(updatedPatients); // Persist to local storage
  
      dispatch(setIsEditing(false));
      dispatch(setIsAdding(false));
      setIsDirty(false);
      console.log('Patient saved:', patient);
  
      // Ensure PatientList updates
      dispatch(setPatients(updatedPatients));
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      const confirmDiscard = window.confirm('You have unsaved changes. Do you really want to discard them?');
      if (!confirmDiscard) {
        return;
      }
    }
    dispatch(setIsEditing(false));
    dispatch(setIsAdding(false));
    dispatch(setSelectedPatient(null));
    setIsDirty(false);
  };

  const handleDeleteToggle = () => {
    if (patient) {
      const confirmDelete = window.confirm(`Are you sure you want to ${patient.deleted ? 'undelete' : 'delete'} this patient?`);
      if (confirmDelete) {
        const updatedPatients = getPatientsFromStorage().map(p =>
          p.id === patient.id ? { ...p, deleted: !p.deleted } : p
        );
        savePatientsToStorage(updatedPatients);
        dispatch(setPatients(updatedPatients));
        dispatch(setSelectedPatient(null)); // Clear the selected patient

        // Update detailed patients in local storage
        const parsedDetailedPatients = getDetailedPatientsFromStorage();
        const updatedDetailedPatients = parsedDetailedPatients.map(p =>
          p.id === patient.id ? { ...p, deleted: !p.deleted } : p
        );
        saveDetailedPatientsToStorage(updatedDetailedPatients);
      }
    }
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
          onDeleteToggle={handleDeleteToggle}
        />
      )}
    </div>
  );
};

export default PatientDetails;
