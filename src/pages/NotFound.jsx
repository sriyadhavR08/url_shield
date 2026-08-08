import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      gap: '1.5rem'
    }}>
      <FaExclamationTriangle style={{ fontSize: '5rem', color: 'var(--status-medium)' }} />
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <h2 style={{ color: 'var(--text-secondary)' }}>Page Not Found</h2>
      <p style={{ maxWidth: '400px', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{
        background: 'var(--btn-bg)',
        color: 'var(--btn-text)',
        padding: '1rem 2rem',
        borderRadius: 'var(--radius)',
        fontWeight: '600'
      }}>
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
