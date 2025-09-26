//Core Module
const path = require('path');

//External Module
const express = require('express');

//Local Module
const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const mongoConnect = require('./utils/databaseUtil');

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
app.use('/host', hostRouter);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Not Found', currentPage: '404' });
});

const PORT = 3000;
mongoConnect((client) => {
  console.log(client);
  app.listen(PORT, () => {
    console.log(`Server listening at port http://localhost:${PORT}`);
  });
});
