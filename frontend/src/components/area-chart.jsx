export default function AreaChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Évolution 2025</h3>
        <span className="growth">+89.1%</span>
      </div>

      <div className="area-chart">
        <svg viewBox="0 0 600 240">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0,200 Q100,150 200,120 Q300,100 400,160 Q500,80 600,130 L600,240 L0,240 Z"
            fill="url(#gradient)"
          />

          <path
            d="M0,200 Q100,150 200,120 Q300,100 400,160 Q500,80 600,130"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <text x="300" y="120" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1d4ed8">
            +89.1%
          </text>
        </svg>
      </div>
    </div>
  );
}