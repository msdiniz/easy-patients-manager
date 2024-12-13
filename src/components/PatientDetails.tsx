import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PatientInfo from './PatientInfo'; // Ensure the default import is used
import PatientForm from "./Form/PatientForm";
import { getSelectedPatient, getIsEditing, getIsAdding } from '../store/selectors';
import { setIsEditing, setSelectedPatient, setPatients, RootState, setIsAdding } from '../store/index';
import { PatientDetails as DetailedPatient } from '../models/PatientModels';
import { PatientUtils } from '../models/PatientUtils';

const PatientDetails: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPatient = useSelector(getSelectedPatient);
  const isEditing = useSelector(getIsEditing);
  const isAdding = useSelector(getIsAdding);
  const patients = useSelector((state: RootState) => state.patients);

  console.log('Selected Patient:', selectedPatient);
  console.log('isEditing:', isEditing, 'isAdding:', isAdding);

  const handleEdit = () => {
    dispatch(setIsEditing(true));
    console.log('onEdit called');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (selectedPatient) {
      dispatch(setSelectedPatient({
        ...selectedPatient,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSave = () => {
    if (selectedPatient) {
      const updatedPatients = isAdding
        ? [...patients, selectedPatient]
        : patients.map(p => p.id === selectedPatient.id ? selectedPatient : p);

      dispatch(setPatients(updatedPatients));
      localStorage.setItem('patients', JSON.stringify(updatedPatients)); // Persist to local storage
      dispatch(setIsEditing(false));
      dispatch(setIsAdding(false));
      console.log('Patient saved:', selectedPatient);
    }
  };

  const handleCancel = () => {
    dispatch(setIsEditing(false));
    dispatch(setSelectedPatient(null));
  };

  const isFormValid = selectedPatient !== null &&
    PatientUtils.isValidName(selectedPatient.fullName.trim()) &&
    new Date(selectedPatient.dob) < new Date() &&
    selectedPatient.gender !== '' &&
    new Date(selectedPatient.dateOfFirstContact) < new Date();

  if (!selectedPatient) {
    return <div>No patient selected</div>;
  }

  return (
    <div className="patient-details">
      {isEditing || isAdding ? (
        <PatientForm
          patient={selectedPatient as DetailedPatient}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isFormValid={isFormValid}
        />
      ) : (
        <PatientInfo
          patient={selectedPatient as DetailedPatient}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default PatientDetails;