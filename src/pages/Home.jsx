import { Link } from 'react-router-dom';
import { FaShieldAlt, FaBolt, FaLock, FaGlobe } from 'react-icons/fa';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>New: Advanced AI Scanning Engine</div>
          <h1>Protect Yourself with <span className={styles.highlight}>URLShield</span></h1>
          <p>
            The ultimate website safety checker. Instantly scan URLs for malware, phishing attempts, and scams before you click.
          </p>
          <div className={styles.heroActions}>
            <Link to="/scanner" className={styles.primaryBtn}>Start Scanning</Link>
            <Link to="/about" className={styles.secondaryBtn}>Learn More</Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.stats}>
        <div className={`glass-card ${styles.statCard}`}>
          <h2>1.5M+</h2>
          <p>URLs Scanned</p>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <h2>99.9%</h2>
          <p>Detection Rate</p>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <h2>500k+</h2>
          <p>Threats Blocked</p>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <h2>24/7</h2>
          <p>Real-time Protection</p>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose URLShield?</h2>
          <p>Enterprise-grade security features for everyday users.</p>
        </div>
        <div className={styles.featureGrid}>
          <div className={`glass-card ${styles.featureCard}`}>
            <FaBolt className={styles.featureIcon} />
            <h3>Lightning Fast</h3>
            <p>Get comprehensive scan results in milliseconds using our globally distributed network.</p>
          </div>
          <div className={`glass-card ${styles.featureCard}`}>
            <FaShieldAlt className={styles.featureIcon} />
            <h3>Deep Analysis</h3>
            <p>We check against 50+ threat intelligence databases to ensure maximum safety.</p>
          </div>
          <div className={`glass-card ${styles.featureCard}`}>
            <FaLock className={styles.featureIcon} />
            <h3>Privacy First</h3>
            <p>Your scans are anonymous. We do not track or sell your browsing data.</p>
          </div>
          <div className={`glass-card ${styles.featureCard}`}>
            <FaGlobe className={styles.featureIcon} />
            <h3>Global Coverage</h3>
            <p>Protecting users worldwide with multi-language support and regional threat detection.</p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={`glass-card ${styles.ctaContent}`}>
          <h2>Ready to browse safely?</h2>
          <p>Create a free account today and keep track of your scan history.</p>
          <Link to="/register" className={styles.primaryBtn}>Get Started Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
