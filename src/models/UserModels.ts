import { Email, Address, Phone } from './ValueObjects';

export interface User {
  id: string;
  fullName: string;
  dob: string;
  gender: string;
  password?: string;
  emails: Email[];
  addresses: Address[];
  phones: Phone[];
  specialties?: string[];
  roles: string[];
}