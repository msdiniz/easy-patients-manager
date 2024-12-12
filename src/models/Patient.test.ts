import { PatientFactory, Patient } from './Patient';

describe('PatientFactory', () => {
  it('should create a new patient with proper case fullName', () => {
    const fullName = "john doe";
    const patient: Patient = PatientFactory.createNewForPatientList(fullName, true);
    expect(patient.fullName).toBe("John Doe");
  });

  it('should create a new patient without modifying fullName', () => {
    const fullName = "john doe";
    const patient: Patient = PatientFactory.createNewForPatientList(fullName, false);
    expect(patient.fullName).toBe("john doe");
  });

  it('should create a new patient detail with proper case fullName', () => {
    const fullName = "john doe";
    const patient = PatientFactory.createNewForPatientDetail(fullName, true);
    expect(patient.fullName).toBe("John Doe");
  });

  it('should create a new patient detail without modifying fullName', () => {
    const fullName = "john doe";
    const patient = PatientFactory.createNewForPatientDetail(fullName, false);
    expect(patient.fullName).toBe("john doe");
  });
});
