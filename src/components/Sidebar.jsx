import { NavLink, useNavigate } from 'react-router-dom';
import { FaChartLine, FaSearch, FaHistory, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className={`${styles.sidebar} glass-card`}>
      <div className={styles.sidebarHeader}>
        <h2>Panel</h2>
      </div>
      <ul className={styles.sidebarMenu}>
        <li>
          <NavLink to="/dashboard" className={({isActive}) => isActive ? styles.active : ''}>
            <FaChartLine /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/scanner" className={({isActive}) => isActive ? styles.active : ''}>
            <FaSearch /> URL Scanner
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({isActive}) => isActive ? styles.active : ''}>
            <FaHistory /> Scan History
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({isActive}) => isActive ? styles.active : ''}>
            <FaUser /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={({isActive}) => isActive ? styles.active : ''}>
            <FaCog /> Settings (Admin)
          </NavLink>
        </li>
      </ul>
      <div className={styles.sidebarFooter}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
