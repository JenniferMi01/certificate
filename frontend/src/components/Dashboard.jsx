import { AppShell, Container, Title, Text, Box } from '@mantine/core';
import Sidebar from './Sidebar';
import StatsGrid from './StatsGrid';
import ChartsSection from './ChartsSection';
import DocumentsTable from './DocumentsTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

// function Dashboard() {
//   return (
//     <AppShell
//       padding="md"
//       navbar={{ width: 250, breakpoint: 'sm' }}
//       styles={{
//         main: {
//           backgroundColor: '#f5f5f5',
//         },
//       }}
//     >
//       <AppShell.Navbar>
//         <Sidebar />
//       </AppShell.Navbar>

//       <AppShell.Main>
//         <Container size="xl" style={{ maxWidth: '100%' }}>
//           <Box mb="xl">
//             <Title order={2} mb="xs">
//               Bienvenue, <span style={{ color: '#228be6' }}>Johary R.</span>
//             </Title>
//             <Text size="sm" c="dimmed">
//               Génerez vos documents en quelques clics
//             </Text>
//           </Box>

//           <StatsGrid />
//           <ChartsSection />
//           <DocumentsTable />
//         </Container>
//       </AppShell.Main>
//     </AppShell>
//   );
// }

function Dashboard() {
  const [userData, setUserData] = useState(null);
   const USER_INFO = "http://localhost:8000/api/me/";
  const TOKEN = localStorage.getItem("access_token") || "";

  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(USER_INFO, config);

        console.log("User data:", response.data);
        setUserData(response.data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des employés :", error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <AppShell
      padding={0}
      styles={{
        main: {
          padding: '24px 32px',   // <-- ESPACEMENT EXACT COMME SUR TON IMAGE
          margin: 0,
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <AppShell.Main>
        <Container size="xl" px={0} style={{ maxWidth: '100%' }}>
          <Box mb="xl">
            <Title order={2} mb="xs">
              Bienvenue, <span style={{ color: '#228be6' }}>{userData?.username}</span>
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
