import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Ensure this is the correct App component
import './index.css'; // Ensure global styles are imported

console.log('Rendering App component');

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
