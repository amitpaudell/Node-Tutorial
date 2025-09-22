const express = require('express');
const hostRouter = express.Router();

const homeController = require('../controller/hostController');

hostRouter.get('/add-home', homeController.getAddHome);
hostRouter.post('/add-home', homeController.postAddHome);
hostRouter.get('/admin-home-list', homeController.getHostHomes);

hostRouter.get('/edit-home/:homeId', homeController.getEditHome);
hostRouter.post('/edit-home', homeController.postEditHome);

exports.hostRouter = hostRouter;
