import { Patient, DetailedPatient } from './PatientModels';
import { PatientUtils } from './PatientUtils';

export class PatientFactory {
  static createNewForPatientList(fullName: string = "", formatName: boolean = true): Patient {
    const id = this.generateUniqueId();
    console.log('Generated new patient ID for list:', id);
    return {
      id,
      fullName: formatName ? PatientUtils.properCase(fullName) : fullName,
      dob: "",
      gender: "",
      cpf: "",
      bookmarks: [], // Corrected to bookmarks
      dateOfFirstContact: ""
    };
  }

  static createNewForPatientDetail(fullName: string = "", formatName: boolean = true): DetailedPatient {
    const id = this.generateUniqueId();
    console.log('Generated new patient ID for detail:', id);
    return {
      id,
      fullName: formatName ? PatientUtils.properCase(fullName) : fullName,
      dob: "",
      gender: "",
      cpf: "",
      bookmarks: [], // Corrected to bookmarks
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
