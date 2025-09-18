const express = require('express');

const hostRouter = express.Router();

hostRouter.get('/add-home', (req, res, next) => {
  res.send('<h1>hostRouter</h1>');
});

module.exports = hostRouter;
