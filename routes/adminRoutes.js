const { dashboard, adminlogin, adminLogout } = require('../controllers/controllers');

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
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .login-container { max-width: 400px; margin: 100px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { text-align: center; color: #333; margin-bottom: 30px; }
            .form-group { margin-bottom: 20px; }
            label { display: block; margin-bottom: 5px; color: #555; }
            input[type="password"] { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
            button { width: 100%; padding: 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
            button:hover { background-color: #0056b3; }
            .error { color: red; text-align: center; margin-top: 10px; }
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
adminRouter.post("/login", adminlogin);
adminRouter.get("/logout", adminLogout);

module.exports = adminRouter;