import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PatientInfo } from './PatientInfo';
import { PatientForm } from './PatientForm';
import { getSelectedPatient, getIsEditing, getIsAdding } from '../store/selectors';
import { setIsEditing, setSelectedPatient } from '../store/index';
import { DetailedPatient } from '../models/PatientModels';

const PatientDetails: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPatient = useSelector(getSelectedPatient);
  const isEditing = useSelector(getIsEditing);
  const isAdding = useSelector(getIsAdding);

  console.log('Selected Patient:', selectedPatient);
  console.log('isEditing:', isEditing, 'isAdding:', isAdding);

  const handleEdit = () => {
    dispatch(setIsEditing(true));
    console.log('onEdit called');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedPatient) {
      dispatch(setSelectedPatient({
        ...selectedPatient,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Save button clicked');
  };

  const handleCancel = () => {
    dispatch(setIsEditing(false));
    dispatch(setSelectedPatient(null));
  };

  const isFormValid = selectedPatient !== null && selectedPatient.fullName.trim() !== '';

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