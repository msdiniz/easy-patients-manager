import { transformToDetailedPatient } from './transformPatient';
import { Patient, DetailedPatient } from '../models/Patient';

describe('transformToDetailedPatient', () => {
  it('should transform a Patient to a DetailedPatient with default values', () => {
    const patient: Patient = {
      id: '1',
      fullName: 'John Doe',
      dob: '1990-01-01',
      gender: 'male',
      cpf: '123.456.789-00',
      bookmark: '',
      dateOfFirstContact: ''
      // ...other properties of Patient
    };

    const detailedPatient: DetailedPatient = transformToDetailedPatient(patient);

    expect(detailedPatient).toEqual({
      ...patient,
      bloodType: '',
      rhFactor: '',
      ethnicGroup: '',
      bookmark: '',
      observation: '',
      notes: '',
      howPatientWasReferred: '',
      dateOfFirstContact: ''
    });
  });

  it('should retain the fullName property', () => {
    const patient: Patient = {
      id: '2',
      fullName: 'Jane Doe',
      dob: '1992-02-02',
      gender: 'female',
      cpf: '987.654.321-00',
      bookmark: '',
      dateOfFirstContact: ''
      // ...other properties of Patient
    };

    const detailedPatient: DetailedPatient = transformToDetailedPatient(patient);

    expect(detailedPatient.fullName).toBe('Jane Doe');
  });

  // Add more tests as needed
});
