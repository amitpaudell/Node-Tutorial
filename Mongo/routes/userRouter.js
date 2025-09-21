const express = require('express');
const userRouter = express.Router();

const homeController = require('../controller/storeController');

userRouter.get('/', homeController.getIndex);
userRouter.get('/homes', homeController.getHomes);
userRouter.get('/booking', homeController.getBookings);
userRouter.get('/favourite', homeController.getFavouriteList);
userRouter.get('/homes/:homeId', homeController.getHomeDetails);

module.exports = userRouter;
