import Sidebar from '../components/sidebar';
import Header from '../components/header';
import StatsCards from '../components/stats-cards';
import AreaChart from '../components/area-chart';
import DonutChart from '../components/donut-chart';
import RecentDocumentsTable from '../components/recent-documents-table';

import './dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* <Sidebar /> */}

      <main className="main-content">
        <Header />
        <StatsCards />

        <section className="charts-row">
          <AreaChart />
          <DonutChart />
        </section>

        <RecentDocumentsTable />
      </main>
    </div>
  );
}