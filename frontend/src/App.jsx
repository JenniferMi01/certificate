// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import { Attestation } from "./components/attestation-conge";
import { AttestationTravail } from "./components/attestation-travail";
import { CertificatTravail } from "./components/certificat-travail";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-72 min-w-0">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/formulaires/conge" element={<Attestation />} />
            <Route path="/formulaires/attestation" element={<AttestationTravail />} />
            <Route path="/formulaires/certificat" element={<CertificatTravail />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}