import React from 'react';
import { Email } from '../../../models/PatientModels';
interface EmailFieldsProps {
    emails: Email[];
    onChange: (emails: Email[]) => void;
}
declare const EmailFields: React.FC<EmailFieldsProps>;
export default EmailFields;
