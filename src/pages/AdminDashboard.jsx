import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaUsers, FaSearch, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, scans: 0, safe: 0, dangerous: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [usersRes, scansRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/all-scans')
      ]);
      
      const allScans = scansRes.data;
      const safeScans = allScans.filter(s => s.status === 'Safe').length;
      const dangerousScans = allScans.filter(s => s.status === 'Dangerous').length;

      setStats({
        users: usersRes.data.length,
        scans: allScans.length,
        safe: safeScans,
        dangerous: dangerousScans
      });
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load admin data. Are you an admin?');
    } finally {
      setLoading(false);
    }
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users (Demo)',
        data: [150, 300, 450, 400, 600, 800],
        backgroundColor: '#4ade80',
      },
      {
        label: 'Scans Performed (Demo)',
        data: [100, 200, 400, 500, 750, 900],
        backgroundColor: '#3A3A3A',
      }
    ]
  };

  const barOptions = {
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

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}><FaSpinner className="spinner" style={{fontSize: '2rem', animation: 'spin 1s linear infinite'}}/></div>;
  }

  if (error) {
    return <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem', color: 'var(--danger-color)'}}>{error}</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Admin Control Panel</h1>
        <p>System overview and management</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statIcon}><FaUsers /></div>
          <div className={styles.statInfo}>
            <h3>Total Users</h3>
            <p className={styles.statValue}>{stats.users.toLocaleString()}</p>
          </div>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statIcon}><FaSearch /></div>
          <div className={styles.statInfo}>
            <h3>Total Scans</h3>
            <p className={styles.statValue}>{stats.scans.toLocaleString()}</p>
          </div>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={`${styles.statIcon} text-safe`}><FaCheckCircle /></div>
          <div className={styles.statInfo}>
            <h3>Safe URLs</h3>
            <p className={styles.statValue}>{stats.safe.toLocaleString()}</p>
          </div>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={`${styles.statIcon} text-danger`}><FaExclamationCircle /></div>
          <div className={styles.statInfo}>
            <h3>Dangerous</h3>
            <p className={styles.statValue}>{stats.dangerous.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={`glass-card ${styles.chartCard}`}>
          <h3>Growth Overview</h3>
          <div className={styles.chartWrapper}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className={`glass-card ${styles.activityCard}`}>
          <h3>Registered Users (Recent)</h3>
          <ul className={styles.activityList}>
            {users.slice(0, 5).map(user => (
              <li key={user.id} className={styles.activityItem}>
                <div className={styles.activityDetails}>
                  <span className={styles.activityAction}>{user.full_name}</span>
                  <span className={styles.activityUser}>{user.email}</span>
                </div>
                <span className={styles.activityTime}>{new Date(user.created_at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
