const express = require('express');
const userRouter = express.Router();

const homeController = require('../controller/homeController');

userRouter.get('/', homeController.getHomes);

module.exports = userRouter;
