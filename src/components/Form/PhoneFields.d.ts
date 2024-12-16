import React from 'react';
import { Phone } from '../../models/PatientModels';
interface PhoneFieldsProps {
    phones: Phone[];
    onChange: (phones: Phone[]) => void;
}
declare const PhoneFields: React.FC<PhoneFieldsProps>;
export default PhoneFields;
