// Configuration file for Hardware Complaint System Frontend
// Modify these settings to customize the application

const CONFIG = {
  // API Configuration
  API_BASE_URL: 'http://localhost:3000',
  
  // Application Settings
  APP_NAME: 'PICT Hardware Complaint Management System',
  APP_VERSION: '1.0.0',
  
  // Department List - Customize for your institution
  DEPARTMENTS: [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electronis and Computer',
    'Artificial Intelligence and Data Science',
  ],
  
  // UI Configuration
  UI: {
    // Color scheme - PICT College Colors
    PRIMARY_COLOR: '#007bff',
    SECONDARY_COLOR: '#0056b3',
    SUCCESS_COLOR: '#28a745',
    ERROR_COLOR: '#dc3545',
    WARNING_COLOR: '#ffc107',
    
    // Animation settings
    ANIMATION_DURATION: 300,
    HOVER_TRANSFORM: 'translateY(-2px)',
    
    // Form settings
    FORM_VALIDATION: true,
    AUTO_SAVE: false,
    
    // Feature flags
    ENABLE_DARK_MODE: false,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_ANIMATIONS: true
  },
  
  // Validation Rules
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_COMPLAINT_LENGTH: 10,
    MAX_COMPLAINT_LENGTH: 1000,
    MIN_ROOM_LENGTH: 2,
    MAX_ROOM_LENGTH: 20
  },
  
  // Messages
  MESSAGES: {
    SUCCESS: {
      COMPLAINT_SUBMITTED: 'Complaint submitted successfully!',
      LOGIN_SUCCESS: 'Login successful! Redirecting to dashboard...',
      LOGOUT_SUCCESS: 'Logged out successfully!'
    },
    ERROR: {
      SERVER_OFFLINE: 'Server is currently unavailable. Please try again later.',
      INVALID_CREDENTIALS: 'Invalid credentials. Please check your password.',
      NETWORK_ERROR: 'Network error. Please check your connection.',
      VALIDATION_ERROR: 'Please check your input and try again.',
      SUBMISSION_FAILED: 'Failed to submit complaint. Please try again.'
    },
    INFO: {
      LOADING: 'Loading...',
      CHECKING_CONNECTION: 'Checking server connection...',
      SUBMITTING: 'Submitting...',
      LOGGING_IN: 'Logging in...'
    }
  },
  
  // Feature descriptions for homepage
  FEATURES: [
    {
      icon: 'fas fa-clipboard-list',
      title: 'Submit Complaints',
      description: 'Report hardware issues quickly and easily'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Track Progress',
      description: 'Monitor complaint status and resolution'
    },
    {
      icon: 'fas fa-bell',
      title: 'Email Notifications',
      description: 'Get updates on your complaint status'
    }
  ],
  
  // Contact Information
  CONTACT: {
    SUPPORT_EMAIL: 'support@pict.edu',
    ADMIN_EMAIL: 'admin@pict.edu',
    PHONE: '+91 (020) 2437-1234',
    ADDRESS: 'Pune Institute of Computer Technology, Dhankawadi, Pune, Maharashtra 411043'
  },
  
  // Footer Information
  FOOTER: {
    COPYRIGHT: '© 2024 PICT Hardware Complaint Management System. All rights reserved.',
    VERSION: 'v1.0.0',
    DEVELOPED_BY: 'PICT IT Department'
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  // Make available globally for browser use
  window.CONFIG = CONFIG;
} 