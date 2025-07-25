// Core Modules
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module
const rootDir = require('../utils/pathUtil');
const { registeredHouse } = require('./hostRouter');

userRouter.get('/', (req, res, next) => {
  console.log(registeredHouse);
  res.render('home', { registeredHouse: registeredHouse });
});

module.exports = userRouter;
