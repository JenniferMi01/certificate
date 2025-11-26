import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import { Attestation } from "./components/attestation";
// import AttestationTravail from "./pages/AttestationTravail";
// import CertificatTravail from "./pages/CertificatTravail";
// import Historique from "./pages/Historique";
// import Login from "./pages/Login";

export default function App() {
  return (
    <div className="flex">
      <main className="flex-1 bg-green-500 min-h-screen">
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/formulaires/conge" element={<Attestation />} />
          {/* <Route path="/attestation-travail" element={<AttestationTravail />} />
          <Route path="/certificat-travail" element={<CertificatTravail />} /> */}
          {/* <Route path="/historique" element={<Historique />} /> */}
        </Routes>
      </main>
    </div>
  );
}
