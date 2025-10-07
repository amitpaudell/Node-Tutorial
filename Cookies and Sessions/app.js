//Core Module
const path = require('path');

//External Module
const express = require('express');

//Local Module
const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');

const rootDir = require('./utils/pathUtil');

const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(userRouter);
app.use(authRouter);
app.use('/host', hostRouter);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Not Found', currentPage: '404' });
});

const PORT = 3000;
mongoose
  .connect(
    'mongodb+srv://root:root@projectair.7zivzfv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=projectAir'
  )
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error while connecting to mongo', err);
  });
