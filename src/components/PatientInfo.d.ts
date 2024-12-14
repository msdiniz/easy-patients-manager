import React from 'react';
import { DetailedPatient } from '../models/PatientModels';
import './PatientInfo.css';
interface PatientInfoProps {
    patient: DetailedPatient;
    onEdit: () => void;
}
declare const _default: React.NamedExoticComponent<PatientInfoProps>;
export default _default;
