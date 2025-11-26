import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App.jsx';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { shadcnCssVariableResolver } from './theme/cssVariableResolver.js';
import { shadcnTheme } from './theme/theme.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider
      theme={shadcnTheme}
      cssVariablesResolver={shadcnCssVariableResolver}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
