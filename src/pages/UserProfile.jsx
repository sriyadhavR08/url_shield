import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSave } from 'react-icons/fa';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'October 15, 2023',
    scansCompleted: 142
  });
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Dummy update
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPasswords({ current: '', new: '', confirm: '' });
    alert('Password updated successfully');
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <h1>User Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className={styles.profileGrid}>
        <div className={`glass-card ${styles.leftCol}`}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                {profile.name.charAt(0)}
              </div>
              <button className={styles.cameraBtn} title="Change Photo">
                <FaCamera />
              </button>
            </div>
            <h2>{profile.name}</h2>
            <p className={styles.emailText}>{profile.email}</p>
            <div className={styles.userStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Member Since</span>
                <span className={styles.statValue}>{profile.joinDate}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Scans Completed</span>
                <span className={styles.statValue}>{profile.scansCompleted}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={`glass-card ${styles.settingsCard}`}>
            <div className={styles.cardHeader}>
              <h3>Profile Information</h3>
              <button 
                className={styles.editBtn} 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            
            <form onSubmit={handleProfileUpdate} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <div className={styles.inputWrapper}>
                  <FaUser className={styles.inputIcon} />
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <div className={styles.inputWrapper}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <button type="submit" className={styles.saveBtn}>
                  <FaSave /> Save Changes
                </button>
              )}
            </form>
          </div>

          <div className={`glass-card ${styles.settingsCard}`}>
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordUpdate} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Current Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <input 
                    type="password" 
                    value={passwords.current}
                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>New Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <input 
                    type="password" 
                    value={passwords.new}
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Confirm New Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <input 
                    type="password" 
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className={styles.saveBtn}>
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
