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
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { to: "/attestation-travail", label: "Attestation de travail", icon: Briefcase },
    { to: "/certificat-travail", label: "Certificat de travail", icon: FileText },
    { to: "/attestation-conge", label: "Attestation de congé", icon: Clock },
    // { to: "/historique", label: "Historique", icon: History },
    { to: "/logout", label: "Déconnexion", icon: LogOut },
  ];

  return (
    <div className="bg-slate-800 h-screen p-4 w-55">
      <div className="w-16 h-16 bg-gray-500 text-black font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-8">
        RH
      </div>

      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
