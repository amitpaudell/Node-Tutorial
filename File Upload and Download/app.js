//Core Module
const path = require('path');

//External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const DB_PATH =
  'mongodb+srv://root:root@projectair.7zivzfv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=projectAir';

//Local Module
const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');

const rootDir = require('./utils/pathUtil');

const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions',
});

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(rootDir, 'public')));
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));
app.use('/host/uploads', express.static(path.join(rootDir, 'uploads')));

app.use(
  session({
    secret: 'abc7c',
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

//Session
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

//Cookies
// app.use((req, res, next) => {
//   req.isLoggedIn = req.get('Cookie')
//     ? req.get('Cookie').split('=')[1] === 'true'
//     : false;
//   console.log(req.isLoggedIn);
//   next();
// });

app.use(userRouter);
app.use(authRouter);
app.use('/host', (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
});
app.use('/host', hostRouter);

app.use((req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Not Found',
    currentPage: '404',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
});

const PORT = 3000;
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error while connecting to mongo', err);
  });
