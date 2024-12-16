import React from 'react';
import { Address } from '../../../models/PatientModels';
import useOptions from '../../../hooks/useOptions';
import FieldGroup from './FieldGroup';

interface AddressFieldsProps {
  addresses: Address[];
  onChange: (addresses: Address[]) => void;
}

const AddressFields: React.FC<AddressFieldsProps> = ({ addresses, onChange }) => {
  const options = useOptions();

  const validateAddress = (address: Address) => {
    if (!address.address) {
      return 'Address is required';
    }
    return '';
  };

  return (
    <FieldGroup
      items={addresses}
      onChange={onChange}
      label="Addresses"
      options={options.addressTypes}
      placeholder="Address"
      typeField="type"
      valueField="address"
      noteField="note"
      validateItem={validateAddress}
    />
  );
};

export default AddressFields;