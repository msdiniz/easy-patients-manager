# EasyPatientsManager TODO

## Features to Implement

### Patient Management
- [ ] **New Patient Button**: 
  - Should only appear if the search text box has a valid name that has found zero correspondence in the patient list.
  - **Valid Name**: Any string that has at least two parts; at least two of the parts need to have three or more characters.
  - When clicked, should add a new patient to the list with the next ID (`id.max + 1`).

### Search Functionality
- [ ] **Clear Button**: 
  - Should appear anytime the search box has text.
  - Clears the search box when clicked.

### Patient Details
- [ ] **Patient Details Tab**: 
  - Should only appear if a patient is highlighted in the patient list.
  - Display patient details and allow editing.

### UI Enhancements
- [ ] **Highlight Selected Patient**: 
  - Ensure the selected patient in the list is highlighted.

## Existing Requirements
- [x] **Basic CRUD Operations for Patients**
  - Implement basic Create, Read, Update, Delete operations for patients.
- [x] **Patient Fields**: 
  - Full Name, DOB, Gender, Emails, Addresses, Phones, CPF, Blood Type, Rh Factor, Ethnic Group, Bookmark, Observation, Notes, How Patient Was Referred, Date of First Contact.
- [x] **Basic CRUD Operations for Clinic Staff**
  - Implement basic Create, Read, Update, Delete operations for clinic staff.
- [x] **Clinic Staff Fields**: 
  - Full Name, Role (Physician, Admin, Supervisor), DOB, Gender, Emails, Addresses, Phones, Specialties (for Physicians).

## Future Enhancements
- [ ] **Patient and Staff Interaction**: 
  - Implement interaction categories (e.g., first consultation, follow-up, urgent consultation, contact, hospitalization, admin).
  - Implement interaction details (e.g., category, location, time, price).
- [ ] **Integration with Google Contacts**: 
  - Fetch patient details from Google Contacts.

## Notes
- Ensure all components are implemented in TypeScript.
- Use React for the frontend and plan for future integration with Electron for desktop application.