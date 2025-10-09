exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    currentPage: 'Login',
    isLoggedIn: false,
  });
};
exports.postLogin = (req, res, next) => {
  console.log(req.body);
  // res.cookie('isLoggedIn', true);
  req.session.isLoggedIn = true;
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  // res.cookie('isLoggedIn', false);
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
