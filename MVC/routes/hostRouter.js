const express = require('express');
const path = require('path');
const hostRouter = express.Router();

const rootDir = require('../utils/pathUtil');
const homeController = require('../controllers/homes');

hostRouter.get('/addHome', homeController.getAddHome);
hostRouter.post('/addHome', homeController.postAddHome);

exports.hostRouter = hostRouter;
