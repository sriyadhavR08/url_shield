import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import api from '../services/api';
import styles from './Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={`glass-card ${styles.authCard}`}>
        <div className={styles.authHeader}>
          <h2>Welcome Back</h2>
          <p>Login to access your dashboard</p>
        </div>
        
        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.inputIcon} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <FaLock className={styles.inputIcon} />
            <input 
              type="password" 
              placeholder="Password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <div className={styles.authOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="#" className={styles.forgotPassword}>Forgot Password?</Link>
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            <FaSignInAlt /> {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className={styles.authFooter}>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
