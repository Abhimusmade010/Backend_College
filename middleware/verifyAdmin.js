
const verifyAdmin = (req, res, next) => {
  if (req.session?.isAdmin) return next();
  return res.redirect('/admin/login');
};

module.exports = verifyAdmin;

  
