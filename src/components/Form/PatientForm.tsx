import React from 'react';
import { DetailedPatient, Bookmark, Email, Address, Phone } from '../../models/PatientModels';
import FormField from './Fields/FormField';
import FormSelect from './Fields/FormSelect';
import FormTextArea from './Fields/FormTextArea';
import FormButtons from './Fields/FormButtons';
import useFormValidation from './useFormValidation';
import useOptions from '../../hooks/useOptions';
import styles from './PatientForm.module.css'; // Import the CSS module
import EmailFields from './Fields/EmailFields';
import AddressFields from './Fields/AddressFields';
import PhoneFields from './Fields/PhoneFields';

interface PatientFormProps {
  patient: DetailedPatient;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | CustomChangeEvent) => void;
  onSave: () => void;
  onCancel: () => void;
  isFormValid: boolean;
}

interface CustomChangeEvent {
  target: {
    name: string;
    value: Email[] | Address[] | Phone[] | Bookmark[];
  };
}

const isCustomChangeEvent = (e: any): e is CustomChangeEvent => {
  return e && e.target && Array.isArray(e.target.value);
};

const PatientForm: React.FC<PatientFormProps> = ({ patient, onChange, onSave, onCancel, isFormValid }) => {
  const options = useOptions(); // Use the custom hook
  const { errors, validateField } = useFormValidation(options);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | CustomChangeEvent) => {
    if (isCustomChangeEvent(e)) {
      onChange(e);
    } else {
      const { name, value } = e.target;
      validateField(name, value);
      onChange(e);
    }
  };

  const handleBookmarkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { options: selectOptions } = e.target;
    const selectedBookmarks: Bookmark[] = [];
    for (const option of selectOptions) {
      if (option.selected) {
        const bookmark = options.bookmarks.find(b => b.id === option.value);
        if (bookmark) {
          selectedBookmarks.push(bookmark);
        }
      }
    }
    const event: CustomChangeEvent = { target: { name: 'bookmarks', value: selectedBookmarks } };
    handleChange(event);
  };

  const handleEmailsChange = (emails: Email[]) => {
    const event: CustomChangeEvent = { target: { name: 'emails', value: emails } };
    handleChange(event);
  };

  const handleAddressesChange = (addresses: Address[]) => {
    const event: CustomChangeEvent = { target: { name: 'addresses', value: addresses } };
    handleChange(event);
  };

  const handlePhonesChange = (phones: Phone[]) => {
    const event: CustomChangeEvent = { target: { name: 'phones', value: phones } };
    handleChange(event);
  };

  return (
    <form className={styles.patientForm}>
      <FormField
        label="Full Name"
        name="fullName"
        value={patient.fullName}
        onChange={handleChange}
        error={errors.fullName}
      />
      <FormField
        label="Date of Birth"
        name="dob"
        type="date"
        value={patient.dob}
        onChange={handleChange}
        error={errors.dob}
      />
      <FormSelect
        label="Gender"
        name="gender"
        value={patient.gender}
        options={['', ...options.genders]} // Add an empty option for new patients
        onChange={handleChange}
        error={errors.gender}
      />
      <FormField
        label="CPF"
        name="cpf"
        value={patient.cpf}
        onChange={handleChange}
        error={errors.cpf}
        placeholder="ddd.ddd.ddd-dd"
      />
      <FormSelect
        label="Blood Type"
        name="bloodType"
        value={patient.bloodType}
        options={['', ...options.bloodTypes]} // Add an empty option for new patients
        onChange={handleChange}
      />
      <FormSelect
        label="Rh Factor"
        name="rhFactor"
        value={patient.rhFactor}
        options={['', ...options.rhFactors]} // Add an empty option for new patients
        onChange={handleChange}
      />
      <FormSelect
        label="Ethnic Group"
        name="ethnicGroup"
        value={patient.ethnicGroup}
        options={['', ...options.ethnicGroups]} // Add an empty option for new patients
        onChange={handleChange}
      />
      <FormTextArea
        label="Observation"
        name="observation"
        value={patient.observation}
        onChange={handleChange}
      />
      <FormTextArea
        label="Notes"
        name="notes"
        value={patient.notes}
        onChange={handleChange}
      />
      <FormTextArea
        label="How Patient Was Referred"
        name="howPatientWasReferred"
        value={patient.howPatientWasReferred}
        onChange={handleChange}
        maxLength={300}
      />
      <FormField
        label="Date of First Contact"
        name="dateOfFirstContact"
        type="date"
        value={patient.dateOfFirstContact || new Date().toISOString().split('T')[0]} // Default to today
        onChange={handleChange}
        error={errors.dateOfFirstContact}
      />
      <EmailFields emails={patient.emails || []} onChange={handleEmailsChange} />
      <AddressFields addresses={patient.addresses || []} onChange={handleAddressesChange} />
      <PhoneFields phones={patient.phones || []} onChange={handlePhonesChange} />
      <FormSelect
        label="Bookmarks"
        name="bookmarks"
        value={patient.bookmarks ? patient.bookmarks.map(b => b.id) : []}
        options={options.bookmarks}
        onChange={handleBookmarkChange}
        multiple
      />
      <FormButtons onSave={onSave} onCancel={onCancel} isFormValid={isFormValid} />
    </form>
  );
};

export default PatientForm;
