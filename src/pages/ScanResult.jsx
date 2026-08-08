import { useLocation, Link, Navigate } from 'react-router-dom';
import { FaShieldAlt, FaExclamationTriangle, FaBan, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import styles from './ScanResult.module.css';

const ScanResult = () => {
  const location = useLocation();
  const url = location.state?.url;

  if (!url) {
    return <Navigate to="/scanner" replace />;
  }

  const scanData = location.state?.scanData;

  // Use the API response data or fallback to defaults if somehow missing
  const status = scanData?.status || 'Safe';
  const score = scanData?.risk_score || 0;
  
  const resultData = {
    url: url,
    status: status,
    score: score,
    details: {
      https: scanData?.https_status ? 'Secure (HTTPS)' : 'Insecure (HTTP)',
      httpsSafe: scanData?.https_status,
      length: scanData?.url_length || url.length,
      lengthSafe: (scanData?.url_length || url.length) < 50,
      ipDetected: scanData?.ip_detected || false,
      shortener: scanData?.shortener_detected || false,
      keywords: scanData?.suspicious_keywords ? scanData.suspicious_keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
    }
  };

  const getStatusIcon = () => {
    if (status === 'Safe') return <FaShieldAlt className="text-safe" />;
    if (status === 'Medium Risk') return <FaExclamationTriangle className="text-medium" />;
    return <FaBan className="text-danger" />;
  };

  const getStatusClass = () => {
    if (status === 'Safe') return 'text-safe';
    if (status === 'Medium Risk') return 'text-medium';
    return 'text-danger';
  };

  const getScoreColor = () => {
    if (score < 20) return '#4ade80';
    if (score < 60) return '#fb923c';
    return '#f87171';
  };

  return (
    <div className={styles.resultContainer}>
      <div className={styles.header}>
        <Link to="/scanner" className={styles.backBtn}><FaArrowLeft /> Back to Scanner</Link>
        <h1>Scan Report</h1>
      </div>

      <div className={`glass-card ${styles.mainResultCard}`}>
        <div className={styles.resultIconWrapper}>
          {getStatusIcon()}
        </div>
        <div className={styles.resultSummary}>
          <h2>{url}</h2>
          <div className={styles.statusBadgeWrapper}>
            <span className={`${styles.statusBadge} ${getStatusClass()} glass-card`}>
              {status}
            </span>
          </div>
        </div>
        <div className={styles.scoreCircle} style={{ borderColor: getScoreColor() }}>
          <span className={styles.scoreValue} style={{ color: getScoreColor() }}>{score}</span>
          <span className={styles.scoreLabel}>Risk Score</span>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={`glass-card ${styles.detailCard}`}>
          <h3>Protocol Status</h3>
          <div className={styles.detailItem}>
            <span>HTTPS Connection</span>
            {resultData.details.httpsSafe ? (
              <span className="text-safe"><FaCheckCircle /> {resultData.details.https}</span>
            ) : (
              <span className="text-danger"><FaTimesCircle /> {resultData.details.https}</span>
            )}
          </div>
        </div>

        <div className={`glass-card ${styles.detailCard}`}>
          <h3>URL Analysis</h3>
          <div className={styles.detailItem}>
            <span>URL Length</span>
            {resultData.details.lengthSafe ? (
              <span className="text-safe"><FaCheckCircle /> Normal ({resultData.details.length} chars)</span>
            ) : (
              <span className="text-medium"><FaExclamationTriangle /> Suspiciously Long ({resultData.details.length} chars)</span>
            )}
          </div>
          <div className={styles.detailItem}>
            <span>IP Address</span>
            {!resultData.details.ipDetected ? (
              <span className="text-safe"><FaCheckCircle /> Not Detected</span>
            ) : (
              <span className="text-danger"><FaTimesCircle /> Direct IP Used</span>
            )}
          </div>
        </div>

        <div className={`glass-card ${styles.detailCard}`}>
          <h3>Threat Intelligence</h3>
          <div className={styles.detailItem}>
            <span>URL Shortener</span>
            {!resultData.details.shortener ? (
              <span className="text-safe"><FaCheckCircle /> Not Detected</span>
            ) : (
              <span className="text-medium"><FaExclamationTriangle /> URL Shortener Used</span>
            )}
          </div>
          <div className={styles.detailItem}>
            <span>Suspicious Keywords</span>
            {resultData.details.keywords.length === 0 ? (
              <span className="text-safe"><FaCheckCircle /> None Found</span>
            ) : (
              <span className="text-danger"><FaTimesCircle /> {resultData.details.keywords.join(', ')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;
