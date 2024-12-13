import { Patient, PatientDetails } from './PatientModels';
import { PatientUtils } from './PatientUtils';

export class PatientFactory {
  static createNewForPatientList(fullName: string = "", formatName: boolean = true): Patient {
    return {
      id: "",
      fullName: formatName ? PatientUtils.properCase(fullName) : fullName,
      dob: "",
      gender: "",
      cpf: "",
      bookmark: "",
      dateOfFirstContact: ""
    };
  }

  static createNewForPatientDetail(fullName: string = "", formatName: boolean = true): PatientDetails {
    return {
      id: "",
      fullName: formatName ? PatientUtils.properCase(fullName) : fullName,
      dob: "",
      gender: "",
      cpf: "",
      bookmark: "",
      dateOfFirstContact: "",
      emails: [],
      addresses: [],
      phones: [],
      bloodType: "",
      rhFactor: "",
      ethnicGroup: "",
      observation: "",
      notes: "",
      howPatientWasReferred: ""
    };
  }
}