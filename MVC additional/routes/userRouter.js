const express = require('express');
const path = require('path');

const rootDir = require('../utils/pathUtil');
const homeController = require('../controllers/homes');

const userRouter = express.Router();

userRouter.get('/', homeController.getHomes);

module.exports = userRouter;
