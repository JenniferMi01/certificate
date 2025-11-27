import { AppShell, Container, Title, Text, Box } from '@mantine/core';
import Sidebar from './Sidebar';
import StatsGrid from './StatsGrid';
import ChartsSection from './ChartsSection';
import DocumentsTable from './DocumentsTable';

function Dashboard() {
  return (
    <AppShell
      padding="md"
      navbar={{ width: 250, breakpoint: 'sm' }}
      styles={{
        main: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl" style={{ maxWidth: '100%' }}>
          <Box mb="xl">
            <Title order={2} mb="xs">
              Bienvenue, <span style={{ color: '#228be6' }}>Johary R.</span>
            </Title>
            <Text size="sm" c="dimmed">
              Génerez vos documents en quelques clics
            </Text>
          </Box>

          <StatsGrid />
          <ChartsSection />
          <DocumentsTable />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default Dashboard;
