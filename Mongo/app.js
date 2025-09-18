const express = require('express');

const app = express();

const userRouter = require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(userRouter);
app.use(hostRouter);

app.use((req, res, next) => {
  res.status(404);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port http://localhost:${PORT}`);
});
