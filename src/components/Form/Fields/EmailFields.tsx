import React from 'react';
import { Email } from '../../../models/PatientModels';
import useOptions from '../../../hooks/useOptions';
import FieldGroup from './FieldGroup';

interface EmailFieldsProps {
  emails: Email[];
  onChange: (emails: Email[]) => void;
}

const EmailFields: React.FC<EmailFieldsProps> = ({ emails, onChange }) => {
  const options = useOptions();

  const validateEmail = (email: Email) => {
    if (!email.email) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.email)) {
      return 'Invalid email address';
    }
    return '';
  };

  return (
    <FieldGroup
      items={emails}
      onChange={onChange}
      label="Emails"
      options={options.emailTypes}
      placeholder="Email"
      typeField="type"
      valueField="email"
      noteField="note"
      validateItem={validateEmail}
    />
  );
};

export default EmailFields;