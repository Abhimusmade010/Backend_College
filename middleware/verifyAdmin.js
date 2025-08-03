

const verifyAdmin = (req, res, next) => {
  // Check if user is logged in as admin
  if (!req.session?.isAdmin) {
    return res.redirect('/admin/login');
  }
  
  // Check if session has expired (optional additional check)
  if (req.session.adminLoginTime) {
    const loginTime = new Date(req.session.adminLoginTime);
    const currentTime = new Date();
    const hoursDiff = (currentTime - loginTime) / (1000 * 60 * 60);
    
    // If session is older than 24 hours, force logout
    if (hoursDiff > 24) {
      req.session.destroy();
      return res.redirect('/admin/login');
    }
  }
  
  next();
};

module.exports = verifyAdmin;


