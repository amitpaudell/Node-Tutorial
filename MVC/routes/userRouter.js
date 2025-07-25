const express = require('express');
const path = require('path');

const rootDir = require('../utils/pathUtil');
const { registeredHouse } = require('./hostRouter');

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  console.log(registeredHouse);
  res.render('home', {
    registeredHouse: registeredHouse,
    pageTitle: 'airbnb home2',
  });
});

module.exports = userRouter;
