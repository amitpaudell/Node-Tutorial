const express = require('express');
const path = require('path');

const rootDir = require('../utils/pathUtil');
const storeController = require('../controllers/storeContoller');

const userRouter = express.Router();

userRouter.get('/', storeController.getIndex);
userRouter.get('/booking', storeController.getBooking);

userRouter.get('/homes', storeController.getHomes);
userRouter.get('/favourite', storeController.getFavouriteList);

module.exports = userRouter;
