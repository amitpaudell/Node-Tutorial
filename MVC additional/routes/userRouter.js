const express = require('express');
const path = require('path');

const rootDir = require('../utils/pathUtil');
const storeController = require('../controllers/storeContoller');

const userRouter = express.Router();

userRouter.get('/', storeController.getIndex);
userRouter.get('/booking', storeController.getBooking);
userRouter.get('/favourite', storeController.getFavouriteList);

userRouter.get('/homes', storeController.getHomes);
userRouter.get('/homes/:homeId', storeController.getHomeDetails);
userRouter.post('/favourite', storeController.postAddToFavourite);

module.exports = userRouter;
