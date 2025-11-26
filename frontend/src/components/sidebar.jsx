import { NavLink } from "react-router-dom";
import { Home, FileText, Briefcase, BedDouble, History } from "lucide-react";

const menu = [
  { to: "/", label: "Tableau de bord", icon: Home },
  { to: "/attestation-travail", label: "Attestation de travail", icon: FileText },
  { to: "/certificat-travail", label: "Certificat de travail", icon: Briefcase },
  { to: "/attestation-conge", label: "Attestation de congé", icon: BedDouble },
  { to: "/historique", label: "Historique", icon: History },
];

export default function Sidebar() {
  return (
    <div className="w-80 bg-[#0f172a] text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-6 py-8 border-b border-gray-800">
        <h1 className="text-2xl font-bold">RH Doc</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menu.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
                <span className="font-medium">{label}</span>
                {isActive && <div className="w-1 h-8 bg-white rounded-l-full absolute right-0" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-gray-800 text-center text-xs text-gray-500">
        CNAS © 2025
      </div>
    </div>
  );
}