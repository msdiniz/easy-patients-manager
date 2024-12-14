import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MainLayout } from './MainLayout';
import store from '../store';

describe('Integration Test', () => {
  it('should add a new patient to the PatientList when the Save button is clicked', () => {
    render(
      <Provider store={store}>
        <MainLayout />
      </Provider>
    );

    // Enter a valid name in the search input
    const searchInput = screen.getByPlaceholderText('Search just by typing here...');
    fireEvent.change(searchInput, { target: { value: 'Johnatan Testing Doester' } });

    // Check if the "New Patient" button appears
    expect(screen.getByRole('button', { name: /new patient/i })).toBeInTheDocument();

    // Click the "New Patient" button
    fireEvent.click(screen.getByRole('button', { name: /new patient/i }));

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Full Name:'), { target: { value: 'Johnatan Testing Doester' } });
    fireEvent.change(screen.getByLabelText('DOB:'), { target: { value: '1940-01-01' } });
    fireEvent.change(screen.getByLabelText('Gender:'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('CPF:'), { target: { value: '333.444.789-00' } });

    // Click the "Save" button
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Check if the new patient is added to the PatientList
    const patientList = screen.getByRole('list');
    const patientListItem = within(patientList).getByText('Johnatan Doester');
    expect(patientListItem).toBeInTheDocument();
  });
});