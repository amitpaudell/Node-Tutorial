const { check, validationResult } = require('express-validator');

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

exports.getSignUp = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'SignUp',
    currentPage: 'SignUp',
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: '', lastName: '', email: '', userType: '' },
  });
};

exports.postSignUp = [
  check('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First Name should be atleast 2 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('First Name should contain only alphabets'),

  check('lastName')
    .matches(/^[A-Za-z\s]*$/)
    .withMessage('Last should contain only alphabets'),

  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  check('password')
    .isLength({ min: 8 })
    .withMessage('Password should contain atleast 8 letters')
    .matches(/[A-Z]/)
    .withMessage('Password should contain atleast one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password should contain atleast one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password should contain atleast one number')
    .matches(/[!@#$%^&*(){}]/)
    .withMessage('Password should contain atleast one special character')
    .trim(),

  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('Password do not match');
      }
      return true;
    }),

  check('userType')
    .notEmpty()
    .withMessage('Please select a user type')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type'),

  check('terms')
    .notEmpty()
    .withMessage('Please agreee with terms and conditions')
    .custom((value, { req }) => {
      if (value !== 'on') {
        throw new Error('Please accept terms and condition');
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        pageTitle: 'SignUp',
        currentPage: 'signup',
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, userType },
      });
    }
    res.redirect('/login');
  },
];
