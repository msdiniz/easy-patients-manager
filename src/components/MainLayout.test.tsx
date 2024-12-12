import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MainLayout } from './MainLayout';

describe('MainLayout Integration Test', () => {
  it('should add a new patient to the PatientList when the Save button is clicked', () => {
    render(<MainLayout />);

    // Click the "Add Patient" button
    fireEvent.click(screen.getByText('Add Patient'));

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Date of Birth'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByPlaceholderText('Gender'), { target: { value: 'Male' } });
    fireEvent.change(screen.getByPlaceholderText('CPF'), { target: { value: '123.456.789-00' } });

    // Click the "Save" button
    fireEvent.click(screen.getByText('Save'));

    // Check if the new patient is added to the PatientList
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
