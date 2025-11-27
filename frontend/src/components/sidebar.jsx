import { Stack, NavLink, Box, Text } from '@mantine/core';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Clock,
  History,
  LogOut,
} from 'lucide-react';

function Sidebar() {
  return (
    <Box
      style={{
        backgroundColor: '#2c3e50',
        height: '100vh',
        padding: '1rem',
      }}
    >
      <Text
        size="lg"
        fw={700}
        mb="xl"
        style={{ color: 'white', padding: '0.5rem' }}
      >
        RH Doc
      </Text>

      <Stack gap="xs">
        <NavLink
          label="Tableau de bord"
          leftSection={<LayoutDashboard size={18} />}
          active
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '&[data-active]': {
                backgroundColor: '#34495e',
              },
              '&:hover': {
                backgroundColor: '#34495e',
              },
            },
          }}
        />
        <NavLink
          label="Attestation de travail"
          leftSection={<Briefcase size={18} />}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#34495e',
              },
            },
          }}
        />
        <NavLink
          label="Certificat de travail"
          leftSection={<FileText size={18} />}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#34495e',
              },
            },
          }}
        />
        <NavLink
          label="Attestation de congé"
          leftSection={<Clock size={18} />}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#34495e',
              },
            },
          }}
        />
        <NavLink
          label="Historique"
          leftSection={<History size={18} />}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#34495e',
              },
            },
          }}
        />
        <NavLink
          label="Déconnexion"
          leftSection={<LogOut size={18} />}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              marginTop: '2rem',
              '&:hover': {
                backgroundColor: '#34495e',
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
}

export default Sidebar;
