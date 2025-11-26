import { FaFileAlt, FaUsers, FaClock } from 'react-icons/fa';

export default function StatsCards() {
  return (
    <section className="stats">
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
    </section>
  );
}