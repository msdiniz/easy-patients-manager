import React from 'react';
import { DetailedPatient, ContactItem, Email, Address, Phone } from '../models/PatientModels';
import './PatientInfo.css'; // Import the CSS file

interface PatientInfoProps {
  patient: DetailedPatient | null;
  onEdit: () => void;
  onDeleteToggle: () => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient, onEdit, onDeleteToggle }) => {
  const isEmail = (item: ContactItem): item is Email => {
    return (item as Email).email !== undefined;
  };
  
  const isAddress = (item: ContactItem): item is Address => {
    return (item as Address).address !== undefined;
  };
  
  const isPhone = (item: ContactItem): item is Phone => {
    return (item as Phone).phone !== undefined;
  };
  
  const renderList = (items: ContactItem[], titleSingular: string, titlePlural: string) => {
    if (!items || items.length === 0) {
      return (
        <div>
          <p><strong>{titlePlural}:</strong> none</p>
        </div>
      );
    }
    const titleText = items.length > 1 ? titlePlural : titleSingular;
    return (
      <div>
        <p><strong>{titleText}</strong></p>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {isEmail(item) && item.email}
              {isAddress(item) && item.address}
              {isPhone(item) && item.phone}
              {item.type && ` (${item.type})`}
              {item.note && ` - Note: ${item.note}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  if (!patient) {
    return <div>No patient selected</div>;
  }
  return (
    <div className="patient-info">
      <h2>{patient.fullName}</h2>
      <p><strong>Date of Birth:</strong> {patient.dob}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>CPF:</strong> {patient.cpf}</p>
      <p><strong>Blood Type:</strong> {patient.bloodType}</p>
      <p><strong>Rh Factor:</strong> {patient.rhFactor}</p>
      <p><strong>Ethnic Group:</strong> {patient.ethnicGroup}</p>
      <p><strong>Observation:</strong> {patient.observation}</p>
      <p><strong>Notes:</strong> {patient.notes}</p>
      <p><strong>How Patient Was Referred:</strong> {patient.howPatientWasReferred}</p>
      <p><strong>Date of First Contact:</strong> {patient.dateOfFirstContact}</p>
      {renderList(patient.emails, 'Email', 'Emails')}
      {renderList(patient.addresses, 'Address', 'Addresses')}
      {renderList(patient.phones, 'Phone', 'Phones')}
      <h3>Emails</h3>
      {/* {(!patient.emails || patient.emails.length === 0) ? (
        <p>None</p>
      ) : (
        patient.emails.map((email, index) => (
          <div key={index}>
            <p>{email.email} {email.type && `(${email.type})`}</p>
            {email.note && <p>Note: {email.note}</p>}
          </div>
        ))
      )} */}
      <p><strong>Bookmarks:</strong> {patient.bookmarks ? patient.bookmarks.map(b => b.name).join(', ') : 'None'}</p>
      {!patient.deleted && <button onClick={onEdit}>Edit</button>}
      <button onClick={onDeleteToggle} style={{ marginLeft: '10px' }}>
        {patient.deleted ? 'Undelete' : 'Delete'}
      </button>
    </div>
  );
};

export default React.memo(PatientInfo);