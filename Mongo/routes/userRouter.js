const path = require('path');

const express = require('express');

const rootDir = require('../utils/pathUtil');

const userRouter = express.Router();
const { registeredHomes } = require('./hostRouter');
userRouter.get('/', (req, res, next) => {
  res.render('home', {
    registeredHomes: registeredHomes,
    pageTitle: 'airbnb Home',
  });
});

module.exports = userRouter;
