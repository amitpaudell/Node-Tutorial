const path = require('path');

const express = require('express');

const rootDir = require('../utils/pathUtil');
const hostRouter = express.Router();

hostRouter.get('/add-home', (req, res, next) => {
  res.render('add-home', { pageTitle: 'Add your home' });
});

const registeredHomes = [];
hostRouter.post('/add-home', (req, res, next) => {
  registeredHomes.push({ houseName: req.body.houseName });
  res.render('homeadded', { pageTitle: 'Home added' });
});

exports.registeredHomes = registeredHomes;
exports.hostRouter = hostRouter;
