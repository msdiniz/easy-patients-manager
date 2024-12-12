import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainLayout } from './MainLayout';

describe('MainLayout Integration Test', () => {
  it('should add a new patient to the PatientList when the Save button is clicked', () => {
    render(<MainLayout />);

    // Click the "Add Patient" button
    fireEvent.click(screen.getByText('Add Patient'));

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Full Name:'), { target: { value: 'Johnatan Doester' } });
    fireEvent.change(screen.getByLabelText('DOB:'), { target: { value: '1940-01-01' } });
    fireEvent.change(screen.getByLabelText('Gender:'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText('CPF:'), { target: { value: '333.444.789-00' } });

    // Click the "Save" button
    fireEvent.click(screen.getByText('Save'));

    // Check if the new patient is added to the PatientList
    expect(screen.getByText('Johnatan Doester')).toBeInTheDocument();
  });
});
