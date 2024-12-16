# EasyPatientsManager TODO

## Features to Implement

### Patient Management

- [x] **New Patient Button**:
  - ~~Should only appear if the search text box has a valid name that has found zero correspondence in the patient list.~~
  - **Valid Name**: Any string that has at least two parts; at least two of the parts need to have three or more characters.
  - ~~When clicked, should add a new patient to the list with the next ID (`id.max + 1`).~~

### Search Functionality

- [x] **Clear Button**:
  - ~~Should appear anytime the search box has text.~~
  - ~~Clears the search box when clicked.~~
  - ~~When text is entered in search, ideally PatientInfo should get empty fullname and No Patient Select be displayed.~~

### Patient Details

- [x] **Patient Details Tab**:
  - ~~Should only appear if a patient is highlighted in the patient list.~~
  - ~~Display patient details and allow editing.~~
  - ~~When I try to save a new patient: Patient saved: {id: 'f34c5s72q', fullName: "Testando Agora de Novo O'Liveira", dob: '2024-12-12', gender: 'Male', cpf: '789.012.345-66', …} PatientDetails.tsx:54 Error loading detailed patient: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON PatientList does not receive new Patient~~
  - ~~When we try to edit patient, but dont do any changes (!Dirty) and we click in another patient, instead of PatientInfo, still PatientForm is displayed~~
  - ~~When we edit patient, and do changes (Dirty) and we lose all changes~~
  - ~~Select is defaulting to the first value in a new patient! it should not assume any value but Date of First Contact should default to today~~

### UI Enhancements

- [x] **Highlight Selected Patient**:
  - ~~Ensure the selected patient in the list is highlighted.~~

## Existing Requirements

- [x] **Basic CRUD Operations for Patients**
  - ~~Implement basic Create, Read, Update, Delete operations for patients.~~
- [x] **Patient Fields**:
  - Full Name, DOB, Gender, Emails, Addresses, Phones, CPF, Blood Type, Rh Factor, Ethnic Group, Bookmark, Observation, Notes, How Patient Was Referred, Date of First Contact.
    1. **Emails**:
       - Fields: email, type, note
       - Type options: home, work, other
       - Note field is optional but required for type "other"

    2. **Addresses**:
       - Fields: address, type, note
       - Type options: home, work, other
       - Note field is optional but required for type "other"

    3. **Phones**:
       - Fields: phone, type, note
       - Type options: home, work, other, cell 1, cell 2, accompanying 1, accompanying 2
       - Note field is optional but required for type "accompanying \d" and "other"

    4. **Dynamic Fields**:
       - Ability to add or remove multiple emails, addresses, and phones dynamically in the form.

- [ ] **Basic CRUD Operations for Clinic Staff**
  - Implement basic Create, Read, Update, Delete operations for clinic staff.
- [ ] **Clinic Staff Fields**:
  - Full Name, Role (Physician, Admin, Supervisor), DOB, Gender, Emails, Addresses, Phones, Specialties (for Physicians).

## Future Enhancements

- [ ] **Patient and Staff Interaction**:
  - Implement interaction categories (e.g., first consultation, follow-up, urgent consultation, contact, hospitalization, admin).
  - Implement interaction details (e.g., category, location, time, price).
  - **Interaction Categories**:
    - consulta primeira vez
    - consulta retorno
    - consulta urgente
    - contato
    - internação hospitalar
    - admin
  - **Interaction Details**:
    - **Contato**:
      - pessoal
      - phone
      - email
      - Whatsapp
      - outro
    - **Local**:
      - consultório
      - casa do paciente
      - sala de emergência
      - visita hospitalar
    - **Time**:
      - start time
      - end time
    - **Preço**
    - **Interaction Rules**:
      - interaction 1-1 category
      - interaction 1-1 local
      - interaction 1-1 preço
      - if (category === internação hospitalar) {
        - interaction 1-n time
        - interaction 1-n preço
      } else {
        - interaction 1-1 time
        - interaction 1-1 preço
      }

- [ ] **Integration with Google Contacts**:
  - Fetch patient details from Google Contacts.

- [x] **Bookmarks Field**:
  - ~~Change the `bookmark` field to `Bookmarks[]` in the model.~~
  - ~~Ensure the `bookmark` field is editable.~~
  - ~~Add a select field in `PatientList` that allows selecting 0 to N bookmarks, and filter the `PatientList` based on the selected values. Any patient can have N bookmarks.~~

- [x] **Delete Operation**:
  - ~~Implement the delete operation for patients.~~
  - ~~Add a boolean field `deleted` in the `Patient` model to handle deletions.~~
  - ~~Ensure the `PatientList` filters out patients marked as deleted.~~

## Notes

- Ensure all components are implemented in TypeScript.
- Use React for the frontend and plan for future integration with Electron for desktop application.

## Application Structure

- The App should be named EasyPatientsManager and it should have a main screen with:
  - **Header**:
    - mini logo icon
    - name of App
    - buttons: Login/Logout button and close
  - **Left Panel (listOfPatientsPanel)**:
    - list of all patients
    - top of it needs a search textbox and find button
    - new patient (registrar/cadastrar)
  - **Right Panel**:
    - a tab panel with at least two tabs:
      - **First Tab (tabLocal)**:
        - blank OR when we click in a patient, it should display a form with all patient fields, including the empty ones.
        - it should have a button edit that turns into save and back in edit after respective actions
        - it should have a button OpenLocalFolder, if it does not exist, it should display CreateLocalFolder instead
      - **Second Tab (tabGoogle)**:
        - identical to First Tab
  - It will be an Electron Desktop App, and its primary source of patients, list displayed at listOfPatientsPanel, will be a JSON located in the `\data` folder:
    - it will be an array of patients
    - each patient should have: Id, fullName, DOB, CPF
  - The source of fields for each patient at tabLocal should be a JSON that will be located in `\data\patients\fullName_Id`.
  - The source of fields for each patient at tabGoogle should be GoogleContactService(fullName).
  - If there is room on the screen, both tabs should be displayed side by side; if not, regular tabs (so, probably a Tab control is not ideal here...)