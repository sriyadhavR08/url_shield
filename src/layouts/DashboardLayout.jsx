import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import styles from './Layout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.dashboardWrapper}>
        <Navbar isDashboard={true} />
        <main className={styles.dashboardContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
