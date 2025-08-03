# Hardware Complaint Management System - API Documentation

## Base URL
```
http://localhost:3000
```

## All Available Routes

### 1. Health Check
**GET** `/health`
- **Description**: Check if server is running
- **Authentication**: None required
- **Response**: Server status and uptime

### 2. Root Endpoint
**GET** `/`
- **Description**: API information and available endpoints
- **Authentication**: None required
- **Response**: API overview

### 3. User Routes (Complaint Submission)
**Base Path**: `/user`

#### Submit Complaint
**POST** `/user/submit`
- **Description**: Submit a new hardware complaint
- **Authentication**: None required
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "natureOfComplaint": "Computer not turning on",
  "department": "Computer Science",
  "roomNo": "CS-101",
  "emailId": "student@college.edu"
}
```

### 4. Admin Routes
**Base Path**: `/admin`

#### Admin Login Page
**GET** `/admin/login`
- **Description**: Serves HTML login page
- **Authentication**: None required
- **Response**: HTML login form

#### Admin Login
**POST** `/admin/login`
- **Description**: Authenticate admin user
- **Authentication**: None required
- **Content-Type**: `application/x-www-form-urlencoded`
- **Body**:
```
password=your-admin-password
```

#### Admin Dashboard
**GET** `/admin/dashboard`
- **Description**: View complaint statistics
- **Authentication**: Admin session required
- **Response**: HTML dashboard with stats

#### Admin Logout
**GET** `/admin/logout`
- **Description**: Logout admin user
- **Authentication**: Admin session required
- **Response**: Redirects to login page

---

## Postman Collection Setup

### 1. Environment Variables
Create a new environment in Postman with these variables:
```
BASE_URL: http://localhost:3000
ADMIN_PASSWORD: your-admin-password-here
```

### 2. Collection Structure

#### Health Check
```
GET {{BASE_URL}}/health
```

#### Root API Info
```
GET {{BASE_URL}}/
```

#### Submit Complaint
```
POST {{BASE_URL}}/user/submit
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "natureOfComplaint": "Computer not turning on",
  "department": "Computer Science",
  "roomNo": "CS-101",
  "emailId": "student@college.edu"
}
```

#### Admin Login
```
POST {{BASE_URL}}/admin/login
Headers:
  Content-Type: application/x-www-form-urlencoded

Body (x-www-form-urlencoded):
password: {{ADMIN_PASSWORD}}
```

#### Admin Dashboard
```
GET {{BASE_URL}}/admin/dashboard
```

#### Admin Logout
```
GET {{BASE_URL}}/admin/logout
```

---

## Testing Flow for Admin

### Step 1: Check Server Health
```bash
GET http://localhost:3000/health
```

### Step 2: Admin Login
```bash
POST http://localhost:3000/admin/login
Content-Type: application/x-www-form-urlencoded

password=your-admin-password
```

### Step 3: Access Dashboard
```bash
GET http://localhost:3000/admin/dashboard
```

### Step 4: Logout
```bash
GET http://localhost:3000/admin/logout
```

---

## Important Notes for Postman Testing

### 1. Session Management
- Admin routes use session-based authentication
- After login, Postman will automatically handle cookies
- Make sure to enable "Automatically follow redirects" in Postman settings

### 2. Cookie Settings
- In Postman, go to Settings → General
- Enable "Automatically follow redirects"
- Enable "Send cookies with requests"

### 3. Testing Admin Routes
1. First call the login endpoint
2. Postman will store the session cookie
3. Subsequent admin requests will include the cookie automatically

### 4. Environment Setup
Make sure your `.env` file has:
```env
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=your-session-secret
```

---

## Expected Responses

### Successful Complaint Submission
```json
{
  "success": true,
  "message": "Complaint submitted successfully!",
  "data": {
    "complaintId": "uuid-here",
    "department": "Computer Science",
    "roomNo": "CS-101",
    "submittedAt": "2023-12-21T10:30:45.123Z"
  }
}
```

### Successful Admin Login
- **Status**: 302 (Redirect)
- **Location**: `/admin/dashboard`

### Admin Dashboard
- **Status**: 200
- **Content-Type**: `text/html`
- **Body**: HTML page with complaint statistics

### Health Check
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2023-12-21T10:30:45.123Z",
  "uptime": 123.456
}
```

---

## Error Responses

### Invalid Password
```json
{
  "success": false,
  "message": "Invalid password"
}
```

### Validation Error
```json
{
  "success": false,
  "errors": [
    {
      "code": "invalid_string",
      "message": "Invalid email address",
      "path": ["emailId"]
    }
  ]
}
```

### Server Error
```json
{
  "success": false,
  "errors": "Failed to submit complaint. Please try again later."
}
```

---

## Troubleshooting

### 1. Session Issues
- Clear Postman cookies if admin routes fail
- Restart the server if session issues persist

### 2. CORS Issues
- The server doesn't have CORS configured for API testing
- Use Postman or similar tools for testing

### 3. Environment Variables
- Ensure `.env` file is in the root directory
- Check that `ADMIN_PASSWORD` is set correctly

### 4. Port Issues
- Default port is 3000
- Check if port is available or change in `.env` 