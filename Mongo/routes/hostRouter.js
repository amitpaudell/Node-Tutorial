const express = require('express');
const hostRouter = express.Router();

const homeController = require('../controller/hostController');

hostRouter.get('/add-home', homeController.getAddHome);

hostRouter.post('/add-home', homeController.postAddHome);
hostRouter.get('/admin-home-list', homeController.getHostHomes);

exports.hostRouter = hostRouter;
