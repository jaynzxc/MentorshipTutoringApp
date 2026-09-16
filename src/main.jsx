import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../assets/css/output.css';

// Mount React root application
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Fatal Error: Failed to find the root element to mount React.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
