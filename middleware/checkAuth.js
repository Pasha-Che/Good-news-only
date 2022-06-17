const checkAuth = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  return next();
};

const checkSession = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.userName = req.session.userName;
    return next();
  }
  next();
};

module.exports = { checkAuth, checkSession };
