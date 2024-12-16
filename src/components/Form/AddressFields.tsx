import React from 'react';
import { Address } from '../../models/PatientModels'; // Import the Address type
import useOptions from '../../hooks/useOptions'; // Import the useOptions hook

interface AddressFieldsProps {
  addresses: Address[];
  onChange: (addresses: Address[]) => void;
}

const AddressFields: React.FC<AddressFieldsProps> = ({ addresses, onChange }) => {
  const options = useOptions(); // Use the options from useOptions

  const handleAddressChange = (index: number, field: string, value: string) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    onChange(updatedAddresses);
  };

  const handleAddAddress = () => {
    onChange([...addresses, { address: '', type: 'home', note: '' }]); // Ensure note is initialized
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    onChange(updatedAddresses);
  };

  return (
    <div>
      <label>Addresses</label>
      {addresses.map((address, index) => (
        <div key={index}>
          <input
            type="text"
            value={address.address}
            onChange={(e) => handleAddressChange(index, 'address', e.target.value)}
            placeholder="Address"
          />
          <select
            value={address.type}
            onChange={(e) => handleAddressChange(index, 'type', e.target.value)}
          >
            {options.addressTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {address.type === 'other' && (
            <input
              type="text"
              value={address.note || ''}
              onChange={(e) => handleAddressChange(index, 'note', e.target.value)}
              placeholder="Note"
            />
          )}
          <button type="button" onClick={() => handleRemoveAddress(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddAddress}>Add Address</button>
    </div>
  );
};

export default AddressFields;