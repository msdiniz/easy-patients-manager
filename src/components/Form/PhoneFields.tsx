import React from 'react';
import { Phone } from '../../models/PatientModels'; // Import the Phone type
import useOptions from '../../hooks/useOptions'; // Import the useOptions hook

interface PhoneFieldsProps {
  phones: Phone[];
  onChange: (phones: Phone[]) => void;
}

const PhoneFields: React.FC<PhoneFieldsProps> = ({ phones, onChange }) => {
  const options = useOptions(); // Use the options from useOptions

  const handlePhoneChange = (index: number, field: string, value: string) => {
    const updatedPhones = [...phones];
    updatedPhones[index] = { ...updatedPhones[index], [field]: value };
    onChange(updatedPhones);
  };

  const handleAddPhone = () => {
    onChange([...phones, { phone: '', type: 'home', note: '' }]); // Ensure note is initialized
  };

  const handleRemovePhone = (index: number) => {
    const updatedPhones = phones.filter((_, i) => i !== index);
    onChange(updatedPhones);
  };

  return (
    <div>
      <label>Phones</label>
      {phones.map((phone, index) => (
        <div key={index}>
          <input
            type="text"
            value={phone.phone}
            onChange={(e) => handlePhoneChange(index, 'phone', e.target.value)}
            placeholder="Phone"
          />
          <select
            value={phone.type}
            onChange={(e) => handlePhoneChange(index, 'type', e.target.value)}
          >
            {options.phoneTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {(phone.type === 'other' || phone.type.startsWith('accompanying')) && (
            <input
              type="text"
              value={phone.note || ''}
              onChange={(e) => handlePhoneChange(index, 'note', e.target.value)}
              placeholder="Note"
            />
          )}
          <button type="button" onClick={() => handleRemovePhone(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddPhone}>Add Phone</button>
    </div>
  );
};

export default PhoneFields;