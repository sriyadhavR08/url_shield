import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaUser, FaCommentAlt } from 'react-icons/fa';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you.</p>
      </div>

      <div className={`glass-card ${styles.contactCard}`}>
        {submitted ? (
          <div className={styles.successMessage}>
            <FaPaperPlane className={styles.successIcon} />
            <h2>Message Sent Successfully!</h2>
            <p>We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Your Name</label>
                <div className={styles.inputWrapper}>
                  <FaUser className={styles.inputIcon} />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Subject</label>
              <div className={styles.inputWrapper}>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={styles.noIconInput}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Message</label>
              <div className={styles.inputWrapper}>
                <FaCommentAlt className={styles.textareaIcon} />
                <textarea 
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              <FaPaperPlane /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
