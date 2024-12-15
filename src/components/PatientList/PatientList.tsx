import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Patient, Bookmark } from '../../models/PatientModels';
import { PatientFactory } from '../../models/PatientFactory';
import './PatientList.css'; // Ensure component-specific styles are imported
import { PatientUtils } from '../../models/PatientUtils';
import { setSelectedPatient, setIsEditing, setIsAdding, setPatients } from '../../store';
import { getPatients } from '../../store/selectors';
import { getPatientsFromStorage } from '../../utils/patientStorage';

interface PatientListProps {
  onSelectPatient: (patientId: string, fullName: string) => void;
  selectedPatientId: string | null;
}

export const PatientList: React.FC<PatientListProps> = ({ onSelectPatient, selectedPatientId }) => {
  const dispatch = useDispatch();
  const patients = useSelector(getPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [useProperCase, setUseProperCase] = useState(true);
  const [showSelectedText, setShowSelectedText] = useState(false); // New state for showing selected text
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]); // New state for selected bookmarks
  const [options, setOptions] = useState<{ bookmarks: Bookmark[] }>({ bookmarks: [] }); // Define options state

  useEffect(() => {
    console.log('PatientList component mounted');
    const storedPatients = getPatientsFromStorage();
    if (storedPatients.length > 0) {
      dispatch(setPatients(storedPatients));
    }
    // Fetch options for bookmarks
    fetch('/options.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched options:', data);
        // Transform the bookmarks data to ensure each bookmark has an id
        const transformedBookmarks = data.bookmarks.map((bookmark: string, index: number) => ({
          id: index.toString(),
          name: bookmark
        }));
        setOptions({ bookmarks: transformedBookmarks });
      })
      .catch(error => console.error('Error loading options:', error));
  }, [dispatch]);

  const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Create a new sorted array instead of mutating the original
  const sortedPatients = [...patients].sort((a, b) => {
    return normalizeString(a.fullName).localeCompare(normalizeString(b.fullName));
  });

  const filteredPatients = sortedPatients.filter(patient =>
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
  };

  const handleBookmarkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const selected: string[] = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedBookmarks(selected);
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
        <input
          type="checkbox"
          checked={useProperCase}
          onChange={e => setUseProperCase(e.target.checked)}
        />
        <label>Use Proper Case</label>
      </div>
      <button onClick={clearLocalStorage}>Reset Data</button>
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={showSelectedText}
          onChange={e => setShowSelectedText(e.target.checked)}
        />
        <label>Show Selected Text</label>
      </div>
      <div className="button-container">
        {searchTerm && PatientUtils.isValidName(searchTerm) && (
          <button onClick={handleNewPatient}>New Patient</button>
        )}
        {searchTerm && (
          <button onClick={() => setSearchTerm('')}>Clear</button>
        )}
      </div>
      <div className="bookmark-filter">
        <label>Filter by Bookmarks:</label>
        <select multiple onChange={handleBookmarkChange}>
          {options.bookmarks && options.bookmarks.map((bookmark: Bookmark) => {
            console.log('Rendering bookmark option:', bookmark);
            console.log('Rendering bookmark option.id:', bookmark.id);
            return (
              <option key={bookmark.id} value={bookmark.name}>
                {bookmark.name}
              </option>
            );
          })}
        </select>
      </div>
      <ul>
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
    </div>
  );
};