// src/App.tsx
import React from 'react';
import { MainLayout } from './components/MainLayout';
import './App.css'; // Optional: if you have specific styles for App

const App: React.FC = () => {
  return (
    <div className="App">
      <MainLayout />
    </div>
  );
};

export default App;
