// import { Stack, NavLink, Box, Text } from '@mantine/core';
// import {
//   LayoutDashboard,
//   Briefcase,
//   FileText,
//   Clock,
//   History,
//   LogOut,
// } from 'lucide-react';

// function Sidebar() {
//   return (
//     <Box
//       style={{
//         backgroundColor: '#2c3e50',
//         height: '100vh',
//         padding: '1rem',
//       }}
//     >
//       <Text
//         size="lg"
//         fw={700}
//         mb="xl"
//         style={{ 
//           // color: 'white', padding: '0.5rem'
//               color: 'black',           // texte visible
//                 backgroundColor: 'gray', // couleur du rond
//                 width: '65px',
//                 height: '65px',
//                 borderRadius: '50%',      // rond parfait
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 margin: '0 auto',         // centrer le rond

//          }}
//       >
//         RH
//       </Text>

//       <Stack gap="xs">
//         <NavLink
//           label="Tableau de bord"
//           leftSection={<LayoutDashboard size={18} />}
//           active
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&[data-active]': {
//                 backgroundColor: '#34495e',
//               },
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           label="Attestation de travail"
//           leftSection={<Briefcase size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           label="Certificat de travail"
//           leftSection={<FileText size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           label="Attestation de congé"
//           leftSection={<Clock size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           label="Historique"
//           leftSection={<History size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           label="Déconnexion"
//           leftSection={<LogOut size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               marginTop: '2rem',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//       </Stack>
//     </Box>
//   );
// }

// export default Sidebar;


// 28 Nov
// import { Stack, NavLink, Box, Text } from '@mantine/core';
// import {
//   LayoutDashboard,
//   Briefcase,
//   FileText,
//   Clock,
//   History,
//   LogOut,
// } from 'lucide-react';
// import { Link } from 'react-router-dom'; // 🔥 Nampiana

// function Sidebar() {
//   return (
//     <Box
//       style={{
//         backgroundColor: '#2c3e50',
//         height: '100vh',
//         padding: '1rem',
//         width: '220px',
//       }}
//     >
//       <Text
//         size="lg"
//         fw={700}
//         mb="xl"
//         style={{ 
//           color: 'black',
//           backgroundColor: 'gray',
//           width: '65px',
//           height: '65px',
//           borderRadius: '50%',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           textAlign: 'center',
//           margin: '0 auto',
//         }}
//       >
//         RH
//       </Text>

//       <Stack gap="xs">
//         <NavLink
//           component={Link}
//           to="/dashboard"
//           label="Tableau de bord"
//           leftSection={<LayoutDashboard size={18} />}
//           active
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&[data-active]': {
//                 backgroundColor: '#34495e',
//               },
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           component={Link}
//           to="/attestation-travail"
//           label="Attestation de travail"
//           leftSection={<Briefcase size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           component={Link}
//           to="/certificat-travail"
//           label="Certificat de travail"
//           leftSection={<FileText size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           component={Link}
//           to="/attestation-conge"
//           label="Attestation de congé"
//           leftSection={<Clock size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           component={Link}
//           to="/historique"
//           label="Historique"
//           leftSection={<History size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//         <NavLink
//           component={Link}
//           to="/logout"
//           label="Déconnexion"
//           leftSection={<LogOut size={18} />}
//           styles={{
//             root: {
//               color: 'white',
//               borderRadius: '4px',
//               marginTop: '2rem',
//               '&:hover': {
//                 backgroundColor: '#34495e',
//               },
//             },
//           }}
//         />
//       </Stack>
//     </Box>
//   );
// }

// export default Sidebar;


import { Stack, NavLink, Box, Text } from '@mantine/core';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Clock,
  History,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); // Pour gérer l'active link

  return (
    <Box
      style={{
        backgroundColor: '#2c3e50',
        height: '100vh',
        padding: '1rem',
        width: '220px',
      }}
    >
      <Text
        size="lg"
        fw={700}
        mb="xl"
        style={{ 
          color: 'black',
          backgroundColor: 'gray',
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          margin: '0 auto',
        }}
      >
        RH
      </Text>

      <Stack gap="xs">
        <NavLink
          component={Link}
          to="/dashboard"
          label="Tableau de bord"
          leftSection={<LayoutDashboard size={18} />}
          active={location.pathname === "/dashboard"}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '--nl-hover': '#34495e',
              '--nl-bg-hover': '#34495e',
            },
          }}
        />
        <NavLink
          component={Link}
          to="/attestation-travail"
          label="Attestation de travail"
          leftSection={<Briefcase size={18} />}
          active={location.pathname === "/attestation-travail"}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '--nl-hover': '#34495e',
              '--nl-bg-hover': '#34495e',
            },
          }}
        />
        <NavLink
          component={Link}
          to="/certificat-travail"
          label="Certificat de travail"
          leftSection={<FileText size={18} />}
          active={location.pathname === "/certificat-travail"}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '--nl-hover': '#34495e',
              '--nl-bg-hover': '#34495e',
            },
          }}
        />
        <NavLink
          component={Link}
          to="/attestation-conge"
          label="Attestation de congé"
          leftSection={<Clock size={18} />}
          active={location.pathname === "/attestation-conge"}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '--nl-hover': '#34495e',
              '--nl-bg-hover': '#34495e',
            },
          }}
        />
        <NavLink
          component={Link}
          to="/historique"
          label="Historique"
          leftSection={<History size={18} />}
          active={location.pathname === "/historique"}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              '--nl-hover': '#34495e',
              '--nl-bg-hover': '#34495e',
            },
          }}
        />
        <NavLink
          component={Link}
          to="/logout"
          label="Déconnexion"
          leftSection={<LogOut size={18} />}
          active={location.pathname === "/logout"}
          styles={{
            root: {
              color: 'white',
              borderRadius: '4px',
              marginTop: '2rem',
              '--nl-hover': '#34495e',
              '--nl-bg-hover': '#34495e',
            },
          }}
        />
      </Stack>
    </Box>
  );
}

export default Sidebar;
