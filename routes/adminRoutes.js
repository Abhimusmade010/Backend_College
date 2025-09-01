const { dashboard, adminlogin, adminLogout, getAllComplaintsForAdmin, updateComplaintStatusController, complaintsManagementPage } = require('../controllers/controllers');

const express = require('express');
const adminRouter = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');

// Serve login page
adminRouter.get("/login", (req, res) => {
  if (req.session?.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Login</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); min-height: 100vh; }
            .login-container { max-width: 400px; margin: 100px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 8px 32px rgba(0, 123, 255, 0.15); border: 1px solid rgba(0, 123, 255, 0.1); }
            h1 { text-align: center; color: #007bff; margin-bottom: 30px; font-weight: 600; }
            .form-group { margin-bottom: 20px; }
            label { display: block; margin-bottom: 5px; color: #495057; font-weight: 500; }
            input[type="password"] { width: 100%; padding: 10px; border: 2px solid #dee2e6; border-radius: 4px; box-sizing: border-box; color: #333; transition: border-color 0.3s ease; }
            input[type="password"]:focus { border-color: #007bff; box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1); outline: none; }
            button { width: 100%; padding: 12px; background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: 500; transition: transform 0.2s ease; }
            button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3); }
            .error { color: #dc3545; text-align: center; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h1>Admin Login</h1>
            <form action="/admin/login" method="POST">
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

adminRouter.get("/dashboard", verifyAdmin, dashboard);
adminRouter.get("/complaints", verifyAdmin, complaintsManagementPage);
adminRouter.get("/api/complaints", verifyAdmin, getAllComplaintsForAdmin);
adminRouter.post("/update-status", verifyAdmin, updateComplaintStatusController);
adminRouter.post("/login", adminlogin);
adminRouter.get("/logout", adminLogout);

module.exports = adminRouter;