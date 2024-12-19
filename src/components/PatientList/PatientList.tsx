import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Patient } from '../../models/PatientModels';
import { PatientFactory } from '../../models/PatientFactory';
import './PatientList.css'; // Ensure component-specific styles are imported
import { PatientUtils } from '../../models/PatientUtils';
import { setSelectedPatient, setIsEditing, setIsAdding, setPatients, setShowDeleted } from '../../store';
import { getPatients } from '../../store/selectors';
import { getPatientsFromStorage } from '../../utils/patientStorage';
import useOptions from '../../hooks/useOptions';
import FilterByBookmarks from './FilterByBookmarks'; // Import the new component
import ApiDataSource from '../../apiContacts/apiDataSource';
import { RootState } from '../../store';
import { people_v1 } from 'googleapis';

interface PatientListProps {
  onSelectPatient: (patientId: string, fullName: string) => void;
  selectedPatientId: string | null;
}

export const PatientList: React.FC<PatientListProps> = ({ onSelectPatient, selectedPatientId }) => {
  const dispatch = useDispatch();
  const patients = useSelector(getPatients) as Patient[]; // Ensure the correct type is used
  const [searchTerm, setSearchTerm] = useState('');
  const [useProperCase, setUseProperCase] = useState(true);
  const [showSelectedText, setShowSelectedText] = useState(false); // New state for showing selected text
  const [showDeleted, setShowDeletedState] = useState(false); // New state for showing deleted patients
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]); // New state for selected bookmarks
  const [googleContacts, setGoogleContacts] = useState<people_v1.Schema$Person[]>([]);
  const options = useOptions(); // Use the custom hook
  const selectRef = useRef<HTMLSelectElement>(null); // Add a ref for the select element
  const authClient = useSelector((state: RootState) => state.auth.authClient);

  useEffect(() => {
    console.log('PatientList component mounted');
    const storedPatients = getPatientsFromStorage();
    if (storedPatients.length > 0) {
      dispatch(setPatients(storedPatients));
    }

    const fetchGoogleContacts = async () => {
      if (authClient) {
        const apiDataSource = new ApiDataSource(authClient);
        try {
          const contacts = await apiDataSource.fetchContacts();
          setGoogleContacts(contacts);
        } catch (error) {
          console.error('Error fetching Google contacts:', error);
        }
      }
    };

    fetchGoogleContacts();
  }, [dispatch, authClient]);

  const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Create a new sorted array instead of mutating the original
  const sortedPatients = [...patients].sort((a, b) => {
    return normalizeString(a.fullName).localeCompare(normalizeString(b.fullName));
  });

  const filteredPatients = sortedPatients.filter(patient =>
    (showDeleted ? patient.deleted : !patient.deleted) && // Filter based on showDeleted state
    normalizeString(patient.fullName).toLowerCase().includes(normalizeString(searchTerm).toLowerCase()) &&
    (selectedBookmarks.length === 0 || (patient.bookmarks && patient.bookmarks.some(b => selectedBookmarks.includes(b.name))))
  );

  useEffect(() => {
    if (searchTerm) {
      dispatch(setSelectedPatient(null));
      onSelectPatient('', ''); // Clear the selected patient
    }
  }, [searchTerm, dispatch, onSelectPatient]);

  const handleNewPatient = () => {
    if (PatientUtils.isValidName(searchTerm)) {
      const newPatient: Patient = PatientFactory.createNewForPatientList(searchTerm, useProperCase);
      console.log('New patient created in PatientList:', newPatient);
      dispatch(setSelectedPatient(newPatient));
      dispatch(setIsEditing(true));
      dispatch(setIsAdding(true));
      onSelectPatient(newPatient.id, newPatient.fullName);
      setSearchTerm(''); // Reset the search term
    }
  };

  const handlePatientClick = (patient: Patient) => {
    console.log('Patient selected in PatientList:', patient);
    dispatch(setSelectedPatient(patient));
    dispatch(setIsEditing(false));
    dispatch(setIsAdding(false));
    onSelectPatient(patient.id, patient.fullName);

    const correspondingGoogleContact = googleContacts.find(contact => contact.names?.[0]?.displayName === patient.fullName);
    if (correspondingGoogleContact) {
      // Populate the second tab with the corresponding Google contact info
      // Implement the logic to populate the second tab
      console.log('Corresponding Google contact found:', correspondingGoogleContact);
    }
  };

  const handleBookmarkChange = (selected: string[]) => {
    setSelectedBookmarks(selected);
  };

  const handleClearBookmarks = () => {
    setSelectedBookmarks([]);
    if (selectRef.current) {
      selectRef.current.value = ''; // Clear the selected value in the select element
    }
  };

  const handleShowDeletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDeletedState(e.target.checked);
    dispatch(setShowDeleted(e.target.checked)); // Dispatch the showDeleted state
    dispatch(setSelectedPatient(null)); // Clear the selected patient
    onSelectPatient('', ''); // Clear the selected patient
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload(); // Reload the page to fetch data from JSON files
  };

  return (
    <div className="patient-list">
      <input
        type="text"
        placeholder="Search just by typing here..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={useProperCase}
            onChange={e => setUseProperCase(e.target.checked)}
          />
          Use Proper Case
        </label>
      </div>
      <button onClick={clearLocalStorage}>Reset Data</button>
      <div className="button-container">
        {searchTerm && PatientUtils.isValidName(searchTerm) && (
          <button onClick={handleNewPatient}>New Patient</button>
        )}
        {searchTerm && (
          <button onClick={() => setSearchTerm('')}>Clear</button>
        )}
      </div>
      <div className="patient-list-divider"></div>
      <FilterByBookmarks
        options={options.bookmarks}
        selectedBookmarks={selectedBookmarks}
        onBookmarkChange={handleBookmarkChange}
        onClearBookmarks={handleClearBookmarks}
      />
      <div className="patient-list-divider"></div>
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showSelectedText}
            onChange={e => setShowSelectedText(e.target.checked)}
          />
          Show Selected Text
        </label>
      </div>
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={handleShowDeletedChange}
          />
          Show Only Deleted Patients
        </label>
      </div>
      <div className="patient-list-divider"></div>
      <ul className="patient-list-ul">
        {filteredPatients.map(patient => (
          <li
            key={patient.id}
            onClick={() => handlePatientClick(patient)}
            className={patient.id === selectedPatientId ? 'selected' : ''}
          >
            {patient.fullName}
            {showSelectedText && patient.id === selectedPatientId && <span> (selected)</span>}
          </li>
        ))}
      </ul>
      <div className="patient-list-vertical-line"></div>
    </div>
  );
};
