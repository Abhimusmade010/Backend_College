const { useState, useEffect } = React;

// API Configuration
const API_BASE_URL = window.CONFIG ? window.CONFIG.API_BASE_URL : 'http://localhost:3000';

// Utility Functions
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      credentials: 'include',
      ...options
    });
    
    if (response.redirected) {
      window.location.href = response.url;
      return null;
    }
    
    const data = await response.json();
    return { success: response.ok, data, status: response.status };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
};

// Components
const Header = ({ currentPage, onNavigate }) => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <h1 style={styles.logo}>
          <i className="fas fa-tools"></i> {window.CONFIG ? window.CONFIG.APP_NAME : 'PICT Hardware Complaint System'}
        </h1>
        <nav style={styles.nav}>
          <button 
            onClick={() => onNavigate('complaint')}
            style={{
              ...styles.navButton,
              ...(currentPage === 'complaint' && styles.activeNavButton)
            }}
          >
            <i className="fas fa-plus-circle"></i> Submit Complaint
          </button>
          <button 
            onClick={() => onNavigate('admin')}
            style={{
              ...styles.navButton,
              ...(currentPage === 'admin' && styles.activeNavButton)
            }}
          >
            <i className="fas fa-user-shield"></i> Admin Login
          </button>
          <a 
            href="demo.html"
            style={{
              ...styles.navButton,
              textDecoration: 'none'
            }}
          >
            <i className="fas fa-play-circle"></i> Demo
          </a>
        </nav>
      </div>
    </header>
  );
};

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    natureOfComplaint: '',
    department: '',
    roomNo: '',
    emailId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const departments = window.CONFIG ? window.CONFIG.DEPARTMENTS : [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electronis and Computer',
    'Artificial Intelligence and Data Science',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await apiCall('/user/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (result.success) {
      setMessage({
        type: 'success',
        text: `Complaint submitted successfully! Your complaint ID is: ${result.data.data.complaintId}`
      });
      setFormData({
        natureOfComplaint: '',
        department: '',
        roomNo: '',
        emailId: ''
      });
    } else {
      setMessage({
        type: 'error',
        text: result.data?.errors || 'Failed to submit complaint. Please try again.'
      });
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>
          <i className="fas fa-clipboard-list"></i> Submit Hardware Complaint
        </h2>
        
        {message.text && (
          <div style={{
            ...styles.message,
            ...(message.type === 'success' ? styles.successMessage : styles.errorMessage)
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <i className="fas fa-exclamation-triangle"></i> Nature of Complaint *
            </label>
            <textarea
              name="natureOfComplaint"
              value={formData.natureOfComplaint}
              onChange={handleChange}
              placeholder="Describe the hardware issue in detail..."
              required
              style={styles.textarea}
              rows="4"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <i className="fas fa-building"></i> Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <i className="fas fa-door-open"></i> Room Number *
            </label>
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              placeholder="e.g., CS-101, Lab-2, Office-3"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <i className="fas fa-envelope"></i> Email Address *
            </label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="your.email@college.edu"
              required
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading && styles.disabledButton)
            }}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Submit Complaint
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('password', password);

    const result = await apiCall('/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData)
    });

    if (result.success) {
      setMessage({
        type: 'success',
        text: 'Login successful! Redirecting to dashboard...'
      });
      setTimeout(() => {
        window.location.href = `${API_BASE_URL}/admin/dashboard`;
      }, 1500);
    } else {
      setMessage({
        type: 'error',
        text: result.data?.message || 'Login failed. Please check your password.'
      });
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>
          <i className="fas fa-user-shield"></i> Admin Login
        </h2>
        
        {message.text && (
          <div style={{
            ...styles.message,
            ...(message.type === 'success' ? styles.successMessage : styles.errorMessage)
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <i className="fas fa-lock"></i> Admin Password *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading && styles.disabledButton)
            }}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          <i className="fas fa-tools"></i> {window.CONFIG ? window.CONFIG.APP_NAME : 'PICT Hardware Complaint Management System'}
        </h1>
        <p style={styles.heroSubtitle}>
          Efficiently manage and track hardware complaints across all departments
        </p>
        
        <div style={styles.features}>
          {(window.CONFIG ? window.CONFIG.FEATURES : [
            { icon: 'fas fa-clipboard-list', title: 'Submit Complaints', description: 'Report hardware issues quickly and easily' },
            { icon: 'fas fa-chart-line', title: 'Track Progress', description: 'Monitor complaint status and resolution' },
            { icon: 'fas fa-bell', title: 'Email Notifications', description: 'Get updates on your complaint status' }
          ]).map((feature, index) => (
            <div key={index} style={styles.feature}>
              <i className={feature.icon} style={styles.featureIcon}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [serverStatus, setServerStatus] = useState('checking');

  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (response.ok) {
        setServerStatus('online');
      } else {
        setServerStatus('offline');
      }
    } catch (error) {
      setServerStatus('offline');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'complaint':
        return <ComplaintForm />;
      case 'admin':
        return <AdminLogin />;
      default:
        return <HomePage />;
    }
  };

  if (serverStatus === 'checking') {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Checking server connection...</p>
      </div>
    );
  }

  if (serverStatus === 'offline') {
    return (
      <div style={styles.errorContainer}>
        <i className="fas fa-exclamation-triangle" style={styles.errorIcon}></i>
        <h2>Server Unavailable</h2>
        <p>The backend server is not running. Please start the server and refresh the page.</p>
        <button onClick={checkServerStatus} style={styles.retryButton}>
          <i className="fas fa-redo"></i> Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main style={styles.main}>
        {renderPage()}
      </main>
      <footer style={styles.footer}>
        <p>{window.CONFIG ? window.CONFIG.FOOTER.COPYRIGHT : '© 2024 PICT Hardware Complaint Management System. All rights reserved.'}</p>
      </footer>
    </div>
  );
};

// Styles
const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1rem 0'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  navButton: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease'
  },
  activeNavButton: {
    background: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  main: {
    flex: 1,
    padding: '2rem 0'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 123, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 123, 255, 0.1)'
  },
  cardTitle: {
    color: '#007bff',
    fontSize: '1.8rem',
    marginBottom: '2rem',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#495057',
    fontWeight: '500',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  input: {
    padding: '0.75rem',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none'
  },
  textarea: {
    padding: '0.75rem',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border-color 0.3s ease',
    outline: 'none'
  },
  select: {
    padding: '0.75rem',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
    transition: 'border-color 0.3s ease',
    outline: 'none'
  },
  submitButton: {
    background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'transform 0.2s ease'
  },
  disabledButton: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none'
  },
  message: {
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: '500'
  },
  successMessage: {
    background: '#d1ecf1',
    color: '#0c5460',
    border: '1px solid #bee5eb'
  },
  errorMessage: {
    background: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  footer: {
    background: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    marginTop: 'auto'
  },
  hero: {
    textAlign: 'center',
    color: 'white',
    padding: '2rem 0'
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '3rem',
    opacity: 0.9
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  },
  feature: {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '2rem',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#007bff'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: 'white',
    gap: '1rem'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: 'white',
    textAlign: 'center',
    padding: '2rem'
  },
  errorIcon: {
    fontSize: '3rem',
    color: '#ff6b6b',
    marginBottom: '1rem'
  },
  retryButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root')); 