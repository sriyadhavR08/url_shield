import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { FaShieldAlt, FaExclamationTriangle, FaBan, FaGlobe, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import styles from './Dashboard.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, safe: 0, medium: 0, dangerous: 0 });
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        setStats(response.data.stats);
        setRecentScans(response.data.recent_scans);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const getStatusClass = (status) => {
    if (status === 'Safe') return 'text-safe';
    if (status === 'Medium Risk') return 'text-medium';
    return 'text-danger';
  };

  // Dummy line chart data as we don't have historical aggregation API yet
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Scans over time (Demo)',
        data: [150, 230, 180, 290, 200, 340, 250],
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const doughnutData = {
    labels: ['Safe', 'Medium Risk', 'Dangerous'],
    datasets: [
      {
        data: [stats.safe, stats.medium, stats.dangerous],
        backgroundColor: ['#4ade80', '#fb923c', '#f87171'],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#BFBFBF' } }
    },
    scales: {
      x: { ticks: { color: '#BFBFBF' }, grid: { color: '#3A3A3A' } },
      y: { ticks: { color: '#BFBFBF' }, grid: { color: '#3A3A3A' } }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#BFBFBF' } }
    }
  };

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}><FaSpinner className="spinner" style={{fontSize: '2rem', animation: 'spin 1s linear infinite'}}/></div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1>Dashboard Overview</h1>
        <Link to="/scanner" className={styles.scanBtn}>New Scan</Link>
      </div>

      <div className={styles.statsGrid}>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statIcon}><FaGlobe /></div>
          <div className={styles.statInfo}>
            <h3>Total Scans</h3>
            <p className={styles.statValue}>{stats.total}</p>
          </div>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={`${styles.statIcon} text-safe`}><FaShieldAlt /></div>
          <div className={styles.statInfo}>
            <h3>Safe URLs</h3>
            <p className={styles.statValue}>{stats.safe}</p>
          </div>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={`${styles.statIcon} text-medium`}><FaExclamationTriangle /></div>
          <div className={styles.statInfo}>
            <h3>Medium Risk</h3>
            <p className={styles.statValue}>{stats.medium}</p>
          </div>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={`${styles.statIcon} text-danger`}><FaBan /></div>
          <div className={styles.statInfo}>
            <h3>Dangerous</h3>
            <p className={styles.statValue}>{stats.dangerous}</p>
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={`glass-card ${styles.chartCard}`}>
          <h3>Scan Activity</h3>
          <div className={styles.chartWrapper}>
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>
        <div className={`glass-card ${styles.chartCard}`}>
          <h3>Threat Distribution</h3>
          <div className={styles.chartWrapper}>
            {stats.total > 0 ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <div style={{display:'flex', height:'100%', alignItems:'center', justifyContent:'center', color:'var(--text-secondary)'}}>No data yet</div>
            )}
          </div>
        </div>
      </div>

      <div className={`glass-card ${styles.tableCard}`}>
        <div className={styles.tableHeader}>
          <h3>Recent Scans</h3>
          <Link to="/history" className={styles.viewAllBtn}>View All</Link>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>URL</th>
                <th>Date</th>
                <th>Risk Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.length > 0 ? recentScans.map((scan) => (
                <tr key={scan.id}>
                  <td className={styles.truncate}>{scan.url}</td>
                  <td>{new Date(scan.scanned_at).toLocaleString()}</td>
                  <td>{scan.risk_score}/100</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusClass(scan.status)}`}>
                      {scan.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>No recent scans found. Create a new scan!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
