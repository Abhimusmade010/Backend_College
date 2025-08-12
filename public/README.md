# Hardware Complaint Management System - Frontend

A modern, responsive React frontend for the Hardware Complaint Management System.

## Features

### 🏠 Home Page
- **Welcome Screen**: Beautiful landing page with system overview
- **Feature Highlights**: Showcases key system capabilities
- **Navigation**: Easy access to all system features

### 📝 Complaint Submission
- **User-Friendly Form**: Clean, intuitive complaint submission interface
- **Department Selection**: Dropdown with common academic departments
- **Form Validation**: Real-time validation with helpful error messages
- **Success Feedback**: Clear confirmation with complaint ID
- **Responsive Design**: Works perfectly on all device sizes

### 🔐 Admin Authentication
- **Secure Login**: Password-protected admin access
- **Session Management**: Automatic redirect to dashboard after login
- **Error Handling**: Clear feedback for authentication failures

### 📊 Admin Dashboard
- **Statistics Overview**: Total, pending, and resolved complaints
- **Department-wise Stats**: Breakdown by department
- **Real-time Data**: Live statistics from backend
- **Logout Functionality**: Secure session termination

## Technical Features

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Modern glass-like interface elements
- **Gradient Backgrounds**: Beautiful color schemes
- **Font Awesome Icons**: Professional iconography
- **Smooth Animations**: Engaging user interactions
- **Responsive Layout**: Mobile-first design approach

### ⚡ Performance
- **CDN Libraries**: Fast loading with CDN-hosted React and Babel
- **Optimized Rendering**: Efficient React component structure
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during operations

### 🔧 API Integration
- **RESTful Communication**: Seamless backend integration
- **Error Handling**: Comprehensive error management
- **Session Support**: Cookie-based authentication
- **Health Checks**: Server status monitoring

## File Structure

```
public/
├── index.html          # Main HTML file with CDN dependencies
├── app.js             # React application with all components
└── README.md          # This documentation file
```

## Setup Instructions

### 1. Backend Prerequisites
Ensure your Node.js backend server is running:
```bash
# In your backend directory
npm start
# or
node server.js
```

### 2. Frontend Access
Open the frontend in your browser:
```
http://localhost:3000/public/index.html
```

### 3. CORS Configuration
The frontend is configured to work with the backend on `http://localhost:3000`. If your backend runs on a different port, update the `API_BASE_URL` in `app.js`.

## Usage Guide

### For Users (Complaint Submission)
1. **Navigate to Home**: Click "Submit Complaint" in the header
2. **Fill the Form**:
   - Describe the hardware issue in detail
   - Select the appropriate department
   - Enter the room number
   - Provide your email address
3. **Submit**: Click "Submit Complaint" button
4. **Confirmation**: Note your complaint ID for tracking

### For Administrators
1. **Access Admin**: Click "Admin Login" in the header
2. **Authentication**: Enter the admin password
3. **Dashboard**: View complaint statistics and department breakdowns
4. **Logout**: Use the logout button when finished

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Dependencies

The frontend uses CDN-hosted libraries for simplicity:
- **React 18**: Modern React with hooks
- **React DOM**: DOM rendering
- **Babel**: JSX compilation
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## Customization

### Styling
All styles are defined in the `styles` object in `app.js`. You can easily modify:
- Colors and gradients
- Layout and spacing
- Typography
- Animations

### Departments
Update the `departments` array in the `ComplaintForm` component to match your institution's departments.

### API Endpoints
Modify the `API_BASE_URL` constant to point to your backend server.

## Troubleshooting

### Common Issues

1. **Server Connection Error**
   - Ensure backend server is running
   - Check if port 3000 is available
   - Verify CORS settings

2. **Form Submission Fails**
   - Check browser console for errors
   - Verify all required fields are filled
   - Ensure email format is valid

3. **Admin Login Issues**
   - Verify admin password in backend `.env` file
   - Check session configuration
   - Clear browser cookies if needed

### Debug Mode
Open browser developer tools (F12) to see:
- API request/response logs
- JavaScript errors
- Network activity

## Security Considerations

- Admin password is transmitted securely
- Session cookies are used for authentication
- Form validation prevents malicious input
- HTTPS recommended for production

## Future Enhancements

Potential improvements for the frontend:
- [ ] Complaint tracking by ID
- [ ] Email notification preferences
- [ ] File upload for complaint attachments
- [ ] Real-time status updates
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced filtering and search
- [ ] Export functionality for reports

## Support

For technical support or feature requests, please refer to the main project documentation or contact the development team. 