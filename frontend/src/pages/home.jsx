// src/pages/home.jsx  (c'est maintenant ton Dashboard complet)
import { FaFileAlt, FaUsers, FaClock, FaDownload, FaHome, FaScroll, FaBed, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './home.css'; // on va créer ce fichier juste après

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ou ce que tu utilises
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">RH Doc</div>
        <nav>
          <Link to="/" className="nav-link">
            <FaHome /> Tableau de brraord
          </Link>
          <Link to="/attestation-travail" className="nav-link">
            <FaFileAlt /> Attestation de travail
          </Link>
          <Link to="/certificat-travail" className="nav-link">
            <FaScroll /> Certificat de travail
          </Link>
          <Link to="/attestation-conge" className="nav-link active">
            <FaBed /> Attestation de congé
          </Link>
          <Link to="/historique" className="nav-link">
            <FaHistory /> Historique
          </Link>
          <button onClick={handleLogout} className="nav-link logout">
            <FaSignOutAlt /> Déconnexion
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h1>Bienvenue, <span>Johary R.</span></h1>
          <p>Générez vos documents en quelques clics</p>
        </header>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <FaFileAlt className="icon" />
            <div>
              <h3>21 324</h3>
              <p>Documents totaux</p>
            </div>
          </div>
          <div className="stat-card">
            <FaUsers className="icon" />
            <div>
              <h3>247</h3>
              <p>Employés actifs</p>
            </div>
          </div>
          <div className="stat-card">
            <FaClock className="icon" />
            <div>
              <h3>28s</h3>
              <p>Temps moyen</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-row">
          {/* Évolution */}
          <div className="chart-card">
            <div className="chart-title">
              <span>Évolution 2025</span>
              <span className="growth">+89.1%</span>
            </div>
            <div className="area-chart">
              <svg viewBox="0 0 600 240">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,200 Q100,150 200,120 Q300,100 400,160 Q500,80 600,130 L600,240 L0,240 Z" fill="url(#grad)" />
                <path d="M0,200 Q100,150 200,120 Q300,100 400,160 Q500,80 600,130" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                <text x="300" y="120" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1d4ed8">+89.1%</text>
              </svg>
            </div>
          </div>

          {/* Donut */}
          <div className="chart-card">
            <div className="chart-title">
              <span>Répartition par type</span>
            </div>
            <div className="donut-container">
              <svg className="donut" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="36" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#2563eb" strokeWidth="36" strokeDasharray="290 500" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="36" strokeDasharray="120 500" strokeDashoffset="-290" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f97316" strokeWidth="36" strokeDasharray="90 500" strokeDashoffset="-410" />
              </svg>
              <div className="donut-center">
                <div className="big">95K</div>
                <div className="small">Total</div>
              </div>
            </div>
            <div className="legend">
              <div className="legend-item">
                <span><div className="dot blue"></div> Attestation travail</span>
                <strong>58%</strong>
              </div>
              <div className="legend-item">
                <span><div className="dot green"></div> Certificat travail</span>
                <strong>24%</strong>
              </div>
              <div className="legend-item">
                <span><div className="dot orange"></div> Attestation congé</span>
                <strong>18%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="recent-table">
          <h2>Derniers documents</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Employé</th>
                <th>Type</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>19/11/2025</td>
                <td>RAMANDANIRAINY Josoa N. F.</td>
                <td>Attestation de travail</td>
                <td><span className="status success">Validé</span></td>
                <td><a href="#"><FaDownload /></a></td>
              </tr>
              <tr>
                <td>18/11/2025</td>
                <td>RAKOTOBE Mariane</td>
                <td>Certificat de travail</td>
                <td><span className="status success">Validé</span></td>
                <td><a href="#"><FaDownload /></a></td>
              </tr>
              <tr>
                <td>18/11/2025</td>
                <td>RAKOTO Andrianirina</td>
                <td>Attestation de congé</td>
                <td><span className="status success">Validé</span></td>
                <td><a href="#"><FaDownload /></a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}