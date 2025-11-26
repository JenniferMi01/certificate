import { FaHome, FaFileAlt, FaScroll, FaBed, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Tableau de bord' },
    { path: '/formulaires/attestation', icon: FaFileAlt, label: 'Attestation de travail' },
    { path: '/formulaires/certificat', icon: FaScroll, label: 'Certificat de travail' },
    { path: '/formulaires/conge', icon: FaBed, label: 'Attestation de congé' },
    { path: '/historique', icon: FaHistory, label: 'Historique' },
    { path: '/login', icon: FaSignOutAlt, label: 'Déconnexion' },
  ];

  return (
    <aside className="w-72 h-screen bg-gray-900 text-white fixed inset-y-0 left-0 z-50 flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-8 text-3xl font-bold text-center border-b border-gray-800">
        RH Doc
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={24} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}