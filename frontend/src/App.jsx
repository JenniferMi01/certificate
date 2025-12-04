// export default App;
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import "@mantine/core/styles.css";

// Placeholder components
// function AttestationTravail() {
//   return <h1>Attestation de travail</h1>;
// }
// function CertificatTravail() {
//   return <h1>Certificat de travail</h1>;
// }
import { AttestationTravail } from "./components/models/AttestationTravail";
import { CertificatTravail } from "./components/models/CertificatTravail";
import { AttestationConge } from "./components/models/AttestationConge";
function Historique() {
  return <h1>Historique</h1>;
}
function Logout() {
  return <h1>Déconnexion</h1>;
}

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/attestation-travail"
                element={<AttestationTravail />}
              />
              <Route
                path="/certificat-travail"
                element={<CertificatTravail />}
              />
              <Route path="/attestation-conge" element={<AttestationConge />} />
              <Route path="/historique" element={<Historique />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
