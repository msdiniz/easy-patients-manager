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

describe('isValidName', () => {
  test.each([
    ['John Doe', true],
    ['Jane Smith', true],
    ['A B', false],
    ['John', false],
    ['John D', false],
    ['John Doe Smith', true],
    ['Jo Do', true],
    ['John D', false],
    ['John Doe ', true],
    [' John Doe', true],
    ['Testando Agora de Novo', true],
    ["Testando Agora D'Novo", true],
  ])('validates name "%s" as %s', (input, expected) => {
    expect(Patient.isValidName(input)).toBe(expected);
  });
});

describe('properCase', () => {
  test.each([
    [" TESTando AGOra De NoVo d'oLiVEira ", "Testando Agora de Novo D'Oliveira"],
    ["john doe", "John Doe"],
    ["jane smith", "Jane Smith"],
    ["a b", "A B"],
    ["john", "John"],
    ["john d", "John d"],//invalid name
    ["john doe smith", "John Doe Smith"],
    ["jo do", "Jo do"],//invalid name
    ["john d", "John d"],//invalid name
    ["john doe ", "John Doe"],
    [" john doe", "John Doe"],
    ["testando agora de novo", "Testando Agora de Novo"],
    ["testando agora d'novo", "Testando Agora D'Novo"],
  ])('properly cases name "%s" to "%s"', (input, expected) => {
    expect(Patient.properCase(input)).toBe(expected);
  });
});