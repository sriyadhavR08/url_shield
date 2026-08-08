import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShieldAlt, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import styles from './URLScanner.module.css';

const URLScanner = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;

    setIsScanning(true);
    setError('');

    try {
      const response = await api.post('/scan', { url });
      navigate('/scan-result', { state: { url: url, scanData: response.data } });
    } catch (err) {
      setError(err.response?.data?.detail || 'Scan failed.');
      setIsScanning(false);
    }
  };

  return (
    <div className={styles.scannerContainer}>
      <div className={styles.scannerHeader}>
        <div className={styles.iconWrapper}>
          <FaShieldAlt className={styles.icon} />
        </div>
        <h1>Analyze suspicious URLs</h1>
        <p>Detect malware, phishing, and scam links with our advanced threat intelligence engine.</p>
      </div>

      <div className={`glass-card ${styles.scanCard}`}>
        <form onSubmit={handleScan} className={styles.scanForm}>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              placeholder="Search or scan a URL (e.g. https://suspicious-site.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={styles.urlInput}
              disabled={isScanning}
              required
            />
          </div>
          <button type="submit" className={styles.scanBtn} disabled={isScanning || !url}>
            {isScanning ? (
              <><FaSpinner className={styles.spinner} /> Scanning...</>
            ) : (
              <><FaSearch /> Scan URL</>
            )}
          </button>
        </form>
        {error && <p className={styles.errorText} style={{color: 'var(--danger-color)', marginTop: '1rem'}}>{error}</p>}
      </div>
      
      <div className={styles.infoSection}>
        <div className={`glass-card ${styles.infoCard}`}>
          <h3>What we check</h3>
          <ul>
            <li>HTTPS Verification</li>
            <li>Phishing Databases</li>
            <li>Malware Signatures</li>
            <li>URL Redirection/Shorteners</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default URLScanner;
