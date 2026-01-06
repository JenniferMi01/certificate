import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "@mantine/core/styles.css";

import { AttestationTravail } from "./components/models/AttestationTravail";
import { CertificatTravail } from "./components/models/CertificatTravail";
import { AttestationConge } from "./components/models/AttestationConge";

function Historique() {
  return <h1>Historique</h1>;
}

function Logout() {
  const { logout } = useAuth();
  logout();
  return <Navigate to="/login" />;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Chargement...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {isAuthenticated && <Sidebar />}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/attestation-travail" element={<ProtectedRoute><AttestationTravail /></ProtectedRoute>} />
          <Route path="/certificat-travail" element={<ProtectedRoute><CertificatTravail /></ProtectedRoute>} />
          <Route path="/attestation-conge" element={<ProtectedRoute><AttestationConge /></ProtectedRoute>} />
          <Route path="/historique" element={<ProtectedRoute><Historique /></ProtectedRoute>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
