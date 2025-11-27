import { MantineProvider } from '@mantine/core';
import Dashboard from './components/Dashboard';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider>
      <Dashboard />
    </MantineProvider>
  );
}

export default App;
