const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    currentPage: 'Login',
    isLoggedIn: false,
    errors: [],
    oldInput: { email: '' },
  });
};
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).render('auth/login', {
      pageTitle: 'Login',
      currentPage: 'login',
      isLoggedIn: false,
      errors: ["User doesn't exist"],
      oldInput: { email },
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render('auth/login', {
      pageTitle: 'Login',
      currentPage: 'login',
      isLoggedIn: false,
      errors: ['Invalid Password'],
      oldInput: { email },
    });
  }

  // res.cookie('isLoggedIn', true);
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
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
    const { firstName, lastName, password, email, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //true=no error
      //false=error
      //So, !errors.isEmpty() means If there are errors present
      return res.status(422).render('auth/signup', {
        pageTitle: 'SignUp',
        currentPage: 'signup',
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, userType },
      });
    }

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
      });
      user
        .save()
        .then(() => {
          res.redirect('/login');
        })
        .catch((err) => {
          return res.status(422).render('auth/signup', {
            pageTitle: 'SignUp',
            currentPage: 'signup',
            isLoggedIn: false,
            errors: [err.message],
            oldInput: { firstName, lastName, email, userType },
          });
        });
    });
  },
];
