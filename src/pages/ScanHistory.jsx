import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTrash, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import api from '../services/api';
import styles from './ScanHistory.module.css';

const ScanHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/scan-history');
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch scan history", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === 'Safe') return 'text-safe';
    if (status === 'Medium Risk') return 'text-medium';
    return 'text-danger';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await api.delete(`/scan/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete scan", error);
      alert('Failed to delete scan.');
    }
  };

  // Filter and Search logic
  const filteredData = data.filter(item => {
    const matchesSearch = item.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}><FaSpinner className="spinner" style={{fontSize: '2rem', animation: 'spin 1s linear infinite'}}/></div>;
  }

  return (
    <div className={styles.historyContainer}>
      <div className={styles.header}>
        <h1>Scan History</h1>
        <p>Review your past website security checks</p>
      </div>

      <div className={`glass-card ${styles.controlsCard}`}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search URLs..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        
        <div className={styles.filterBox}>
          <FaFilter className={styles.filterIcon} />
          <select 
            value={filter} 
            onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Statuses</option>
            <option value="Safe">Safe</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="Dangerous">Dangerous</option>
          </select>
        </div>
      </div>

      <div className={`glass-card ${styles.tableCard}`}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>URL</th>
                <th>Date & Time</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.urlCell}>{item.url}</td>
                    <td>{new Date(item.scanned_at).toLocaleString()}</td>
                    <td>{item.risk_score}/100</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(item.id)}
                        title="Delete record"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.noData}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <FaChevronLeft />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHistory;
