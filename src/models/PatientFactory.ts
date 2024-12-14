import { Patient, DetailedPatient } from './PatientModels';
import { PatientUtils } from './PatientUtils';

export class PatientFactory {
  static createNewForPatientList(fullName: string = "", formatName: boolean = true): Patient {
    return {
      id: this.generateUniqueId(),
      fullName: formatName ? PatientUtils.properCase(fullName) : fullName,
      dob: "",
      gender: "",
      cpf: "",
      bookmark: "",
      dateOfFirstContact: ""
    };
  }

  static createNewForPatientDetail(fullName: string = "", formatName: boolean = true): DetailedPatient {
    return {
      id: this.generateUniqueId(),
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

  private static generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}