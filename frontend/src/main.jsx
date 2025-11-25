import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Ajoute le Router
import './index.css';
import App from './App.jsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <Router> {/* Enveloppe ton App avec Router */}
        <App />
      </Router>
    </MantineProvider>
  </StrictMode>,
);
