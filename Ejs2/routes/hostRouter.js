const express = require('express');
const path = require('path');
const hostRouter = express.Router();

const rootDir = require('../utils/pathUtil');

hostRouter.get('/addHome', (req, res, next) => {
  res.render('addHome', { pageTitle: 'Add Home' });
});

const registeredHouse = [];
hostRouter.post('/addHome', (req, res, next) => {
  registeredHouse.push({
    houseName: req.body.houseName,
    pricePerNight: req.body.ppn,
    location: req.body.location,
    rating: req.body.rating,
  });
  res.render('homeAdded', { pageTitle: 'home is added' });
});

exports.hostRouter = hostRouter;
exports.registeredHouse = registeredHouse;
