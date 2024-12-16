import React from 'react';
import { Email } from '../../models/PatientModels'; // Import the Email type
import useOptions from '../../hooks/useOptions'; // Import the useOptions hook

interface EmailFieldsProps {
  emails: Email[];
  onChange: (emails: Email[]) => void;
}

const EmailFields: React.FC<EmailFieldsProps> = ({ emails, onChange }) => {
  const options = useOptions(); // Use the options from useOptions

  const handleEmailChange = (index: number, field: string, value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = { ...updatedEmails[index], [field]: value };
    onChange(updatedEmails);
  };

  const handleAddEmail = () => {
    onChange([...emails, { email: '', type: 'home', note: '' }]); // Ensure note is initialized
  };

  const handleRemoveEmail = (index: number) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    onChange(updatedEmails);
  };

  return (
    <div>
      <label>Emails</label>
      {emails.map((email, index) => (
        <div key={index}>
          <input
            type="email"
            value={email.email}
            onChange={(e) => handleEmailChange(index, 'email', e.target.value)}
            placeholder="Email"
          />
          <select
            value={email.type}
            onChange={(e) => handleEmailChange(index, 'type', e.target.value)}
          >
            {options.emailTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {email.type === 'other' && (
            <input
              type="text"
              value={email.note || ''}
              onChange={(e) => handleEmailChange(index, 'note', e.target.value)}
              placeholder="Note"
            />
          )}
          <button type="button" onClick={() => handleRemoveEmail(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddEmail}>Add Email</button>
    </div>
  );
};

export default EmailFields;
