const express = require('express');
const path = require('path');
const rootDir = require('./utils/pathUtil');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const homeController = require('./controllers/error');

app.use(express.urlencoded());

app.use(userRouter);
app.use('/host', hostRouter);

app.use(express.static(path.join(rootDir, 'public')));

app.use(homeController.handleError);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
