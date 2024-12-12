import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

console.log('Rendering App component');

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
