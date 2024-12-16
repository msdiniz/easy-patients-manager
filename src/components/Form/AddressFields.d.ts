import React from 'react';
import { Address } from '../../models/PatientModels';
interface AddressFieldsProps {
    addresses: Address[];
    onChange: (addresses: Address[]) => void;
}
declare const AddressFields: React.FC<AddressFieldsProps>;
export default AddressFields;
