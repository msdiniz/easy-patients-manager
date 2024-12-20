import React from 'react';
import { Phone } from '../../../models/PatientModels';
import useOptions from '../../../hooks/useOptions';
import FieldGroup from './FieldGroup';

interface PhoneFieldsProps {
  phones: Phone[];
  onChange: (phones: Phone[]) => void;
}

const PhoneFields: React.FC<PhoneFieldsProps> = ({ phones, onChange }) => {
  const options = useOptions();

  const validatePhone = (phone: Phone) => {
    if (!phone.phone) {
      return 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(phone.phone)) {
      return 'Invalid phone number';
    }
    return '';
  };

  return (
    <FieldGroup
      items={phones}
      onChange={onChange}
      label="Phone"
      options={options.phoneTypes}
      placeholder="Phone"
      typeField="type"
      valueField="phone"
      noteField="note"
      validateItem={validatePhone}
    />
  );
};

export default PhoneFields;