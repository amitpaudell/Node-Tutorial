const express = require('express');
const path = require('path');
const hostRouter = express.Router();

const rootDir = require('../utils/pathUtil');
const hostController = require('../controllers/hostController');

hostRouter.get('/addHome', hostController.getAddHome);
hostRouter.post('/addHome', hostController.postAddHome);
hostRouter.get('/host-home-list', hostController.getHostHomes);

exports.hostRouter = hostRouter;
