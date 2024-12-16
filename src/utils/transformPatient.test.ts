import { transformToDetailedPatient, transformToPatient } from './transformPatient';
import { Patient, DetailedPatient } from '../models/PatientModels';

describe('transformToDetailedPatient', () => {
  it('should transform a Patient to a DetailedPatient with default values', () => {
    const patient: Patient = {
      id: '1',
      fullName: 'John Doe',
      dob: '1990-01-01',
      gender: 'male',
      cpf: '123.456.789-00',
      bookmarks: [],
      dateOfFirstContact: ''
    };

    const detailedPatient: DetailedPatient = transformToDetailedPatient(patient);

    expect(detailedPatient).toEqual({
      ...patient,
      emails: [],
      addresses: [],
      phones: [],
      bloodType: '',
      rhFactor: '',
      ethnicGroup: '',
      observation: '',
      notes: '',
      howPatientWasReferred: '',
      deleted: undefined,
      bookmarks: [],
    });
  });
  describe('transformToPatient', () => {
    it('should transform a DetailedPatient to a Patient', () => {
      const detailedPatient: DetailedPatient = {
        id: '1',
        fullName: 'John Doe',
        dob: '1990-01-01',
        gender: 'male',
        cpf: '123.456.789-00',        
        dateOfFirstContact: '',
        bookmarks: [],
        emails: [],
        addresses: [],
        phones: [],
        bloodType: '',
        rhFactor: '',
        ethnicGroup: '',
        observation: '',
        notes: '',
        howPatientWasReferred: ''
      };
  
      const patient: Patient = transformToPatient(detailedPatient);
  
      expect(patient).toEqual({
        id: '1',
        fullName: 'John Doe',
        dob: '1990-01-01',
        gender: 'male',
        cpf: '123.456.789-00',
        dateOfFirstContact: '',
        deleted: undefined,
        bookmarks: [],
      });
    });
  // Add more tests as needed
  });
});