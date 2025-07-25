// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require('../utils/pathUtil');

hostRouter.get('/add-home', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
});

const registeredHouse = [];
hostRouter.post('/add-home', (req, res, next) => {
  registeredHouse.push({ houseName: req.body.houseName });
  res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));
});

exports.hostRouter = hostRouter;
exports.registeredHouse = registeredHouse;
