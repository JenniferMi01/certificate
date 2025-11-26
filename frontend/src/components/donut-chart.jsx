export default function DonutChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Répartition par type</h3>
      </div>

      <div className="donut-wrapper">
        <svg className="donut" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="36" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#2563eb" strokeWidth="36" strokeDasharray="290 500" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="36" strokeDasharray="120 500" strokeDashoffset="-290" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#f97316" strokeWidth="36" strokeDasharray="90 500" strokeDashoffset="-410" />
        </svg>

        <div className="donut-center">
          <div className="donut-big">95K</div>
          <div className="donut-small">Total</div>
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
  );
}