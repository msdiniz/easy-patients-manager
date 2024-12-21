import React from 'react';
import './PatientList.css';
interface PatientListProps {
    onSelectPatient: (patientId: string, fullName: string) => void;
    selectedPatientId: string | null;
}
declare const PatientList: React.FC<PatientListProps>;
export default PatientList;
