const { sendEmail } = require("../utils/nodemailer");
const { appendToSheet } = require("../utils/sheet");
const {v4: uuid} = require("uuid");
const { getDashboardStats } = require("../utils/stats");

const submitForm = async (req, res) => {
  try {

    const { natureOfComplaint, department, roomNo, emailId } =req.body;

    const complaintId=uuid();

    await appendToSheet({complaintId,natureOfComplaint, department, roomNo, emailId});
        await sendEmail({ complaintId,emailId,department,natureOfComplaint,roomNo});
    
    res.status(200).json({ 
      success: true,
      message: "Complaint submitted successfully!",
      data: {
        complaintId,
        department,
        roomNo,
        submittedAt: new Date().toISOString()
      }
    });
    
  } catch (errors) {
    console.error("Error submitting complaint:", errors);
    
    if (errors.code === 'ENOENT') {
      return res.status(500).json({ 
        success: false,
        errors: "Configuration error: Missing credentials file"
      });
    }
    
    if (errors.code === 'EAUTH') {
      return res.status(500).json({ 
        success: false,
        errors: "Email service configuration error"
      });
    }
    
    res.status(500).json({ 
      success: false,
      errors: "Failed to submit complaint. Please try again later."
    });
  }
};

const dashboard=async (req, res) => {
  try {
    const stats = await getDashboardStats();
    
    // Serve HTML dashboard page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Admin Dashboard</title>
          <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
              .dashboard-container { max-width: 1200px; margin: 0 auto; }
              .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
              .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
              .stat-number { font-size: 2.5em; font-weight: bold; color: #007bff; margin-bottom: 10px; }
              .stat-label { color: #666; font-size: 1.1em; }
              .logout-btn { background-color: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
              .logout-btn:hover { background-color: #c82333; }
              .department-stats { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .dept-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
              .dept-row:last-child { border-bottom: none; }
          </style>
      </head>
      <body>
          <div class="dashboard-container">
              <div class="header">
                  <h1>Hardware Complaint Dashboard</h1>
                  <a href="/admin/logout" class="logout-btn">Logout</a>
              </div>
              
              <div class="stats-grid">
                  <div class="stat-card">
                      <div class="stat-number">${stats.totalComplaints}</div>
                      <div class="stat-label">Total Complaints</div>
                  </div>
                  <div class="stat-card">
                      <div class="stat-number">${stats.pendingComplaints}</div>
                      <div class="stat-label">Pending</div>
                  </div>
                  <div class="stat-card">
                      <div class="stat-number">${stats.resolvedComplaints}</div>
                      <div class="stat-label">Resolved</div>
                  </div>
              </div>
              
              <div class="department-stats">
                  <h2>Department-wise Statistics</h2>
                  ${Object.entries(stats.departmentWise).map(([dept, data]) => `
                      <div class="dept-row">
                          <strong>${dept}</strong>
                          <span>Total: ${data.total} | Pending: ${data.pending} | Resolved: ${data.resolved}</span>
                      </div>
                  `).join('')}
              </div>
          </div>
      </body>
      </html>
    `);
  } catch (errors) {
    console.error("Dashboard error:", errors);
    return res.status(500).json({
      success: false, 
      errors: "Failed to load dashboard stats" 
    });
  }
};
const adminlogin=async (req,res)=>{
  const password=req.body.password;
  try {
    if (password === process.env.ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      req.session.adminLoginTime = new Date().toISOString();
      return res.redirect('/admin/dashboard');
    }
    else{
      return res.status(401).json({
        success: false,
        message:"Invalid password"
      })
    }
}catch (errors) {
    console.error("Admin login failed:", errors);
    res.status(500).json({ 
      success: false,
      errors: "Failed to login as admin. Please try again."
    });
  }
}

const adminLogout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to logout"
        });
      }
      res.redirect('/admin/login');
    });
  } catch (error) {
    console.error("Admin logout failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to logout"
    });
  }
};

module.exports ={submitForm,dashboard,adminlogin,adminLogout};