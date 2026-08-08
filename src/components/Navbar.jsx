import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = ({ isDashboard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className={`${styles.navbar} ${isDashboard ? styles.dashboardNav : ''} glass-card`}>
      <div className={styles.logo}>
        <Link to="/">
          <FaShieldAlt className={styles.icon} />
          <span>URLShield</span>
        </Link>
      </div>
      
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        {!isDashboard && (
          <>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          </>
        )}
        <li><Link to="/scanner" onClick={toggleMenu}>Scanner</Link></li>
        {isAuthenticated && <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>}
        
        <li className={styles.authLinks}>
          {isAuthenticated ? (
            <button className={styles.registerBtn} onClick={() => { handleLogout(); toggleMenu(); }}>Logout</button>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn} onClick={toggleMenu}>Login</Link>
              <Link to="/register" className={styles.registerBtn} onClick={toggleMenu}>Register</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
