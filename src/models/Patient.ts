// models/Patient.ts
export interface Email {
  email: string;
  type: string;
}

export interface Address {
  address: string;
  type: string;
}

export interface Phone {
  phone: string;
  type: string;
}

export interface Patient {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  cpf: string;
  bookmark: string;
  dateOfFirstContact: string;
  // Add optional properties
  bloodType?: string;
  rhFactor?: string;
  ethnicGroup?: string;
  observation?: string;
  notes?: string;
  howPatientWasReferred?: string;
}

export interface DetailedPatient extends Patient {
  bloodType: string;
  rhFactor: string;
  ethnicGroup: string;
  observation: string;
  notes: string;
  howPatientWasReferred: string;
}

export interface PatientDetails extends Patient {
  emails: Email[];
  addresses: Address[];
  phones: Phone[];
  bloodType: string;
  rhFactor: string;
  ethnicGroup: string;
  observation: string;
  notes: string;
  howPatientWasReferred: string;
}

export class PatientFactory {
  static createNewForPatientList(fullName: string = "", formatName: boolean = true): Patient {
    return {
      id: "",
      fullName: formatName ? Patient.properCase(fullName) : fullName,
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
      fullName: formatName ? Patient.properCase(fullName) : fullName,
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

export class Patient {
  // ...existing code...

  static properCase(name: string): string {
    const lowerCaseWords = ['d', 'da', 'das', 'de', 'do', 'dos', 'e', 'van', 'von'];
    return name
      .trim() // Trim the input before applying proper case
      .toLowerCase()
      .split(' ')
      .map(word => {
        if (lowerCaseWords.includes(word)) {
          return word;
        }
        if (word.length > 1 && word[1] === "'") {
          return word[0].toUpperCase() + "'" + word[2].toUpperCase() + word.slice(3);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  static isValidName(name: string): boolean {
    const nameParts = name.trim().split(/\s+/);
    return nameParts.length >= 2 && nameParts.every(part => part.length >= 2);
  }
}

// models/Staff.ts
export interface Staff {
  id: string;
  fullName: string;
  role: string;
  dob: string;
  gender: string;
  emails: Email[];
  addresses: Address[];
  phones: Phone[];
  specialties?: string[];
}