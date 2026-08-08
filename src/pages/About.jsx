import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.header}>
        <h1>About URLShield</h1>
        <p>Your first line of defense against cyber threats.</p>
      </div>

      <div className={styles.contentGrid}>
        <div className={`glass-card ${styles.textCard}`}>
          <h2>The Project</h2>
          <p>
            URLShield was created with a single mission: to make the internet a safer place for everyone. 
            With the exponential rise in phishing attacks, malicious links, and sophisticated scams, 
            we built a tool that empowers users to verify any link before clicking.
          </p>
          <p>
            Our system aggregates threat intelligence from multiple global databases to provide 
            real-time analysis and risk assessment for any URL you encounter.
          </p>
        </div>

        <div className={`glass-card ${styles.textCard}`}>
          <h2>Core Features</h2>
          <ul>
            <li><strong>Real-time Scanning:</strong> Instant analysis of URLs.</li>
            <li><strong>Threat Intelligence:</strong> Backed by industry-leading databases.</li>
            <li><strong>Comprehensive Reports:</strong> Detailed breakdown of risk factors.</li>
            <li><strong>Privacy Focused:</strong> We don't track your scanning history.</li>
          </ul>
        </div>
        
        <div className={`glass-card ${styles.textCard}`}>
          <h2>Technology Stack</h2>
          <p>
            URLShield is built using modern, performant web technologies to ensure a seamless experience:
          </p>
          <div className={styles.techTags}>
            <span>React.js</span>
            <span>Vite</span>
            <span>Chart.js</span>
            <span>React Router</span>
            <span>CSS Modules</span>
            <span>FastAPI (Backend API)</span>
          </div>
        </div>

        <div className={`glass-card ${styles.textCard}`}>
          <h2>Developer Information</h2>
          <p>
            Developed by a team of cybersecurity enthusiasts dedicated to open-source and web safety.
            For collaboration or enterprise inquiries, please visit our contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
