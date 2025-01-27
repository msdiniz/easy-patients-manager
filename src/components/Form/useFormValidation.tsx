import { useState } from 'react';
import { PatientUtils } from '../../models/PatientUtils';

const useFormValidation = (options: any) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'fullName' && !PatientUtils.isValidName(value)) {
      error = 'Invalid name';
    } else if (name === 'dob') {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (dob >= today) {
        error = 'DOB must be in the past';
      } else if (age > 115) {
        error = 'Age cannot be more than 115 years';
      }
    } else if (name === 'gender' && !options.genders.includes(value)) {
      error = 'Invalid gender';
    } else if (name === 'cpf' && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) {
      error = 'Invalid CPF format';
    } else if (name === 'dateOfFirstContact') {
      if (new Date(value) >= new Date()) {
        error = 'Date of first contact must be in the past';
      }
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      return 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(phone)) {
      return 'Invalid phone number';
    }
    return '';
  };

  const validateAddress = (address: string) => {
    if (!address) {
      return 'Address is required';
    }
    return '';
  };

  return { errors, validateField, validateEmail, validatePhone, validateAddress };
};

export default useFormValidation;
