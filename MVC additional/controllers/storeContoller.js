const Home = require('../models/home');

exports.getIndex = (req, res, next) => {
  const registeredHouse = Home.fetch((registeredHouse) =>
    res.render('store/index', {
      registeredHouse: registeredHouse,
      pageTitle: 'airbnb home2',
    })
  );
};

exports.getHomes = (req, res, next) => {
  const registeredHouse = Home.fetch((registeredHouse) =>
    res.render('store/home', {
      registeredHouse: registeredHouse,
      pageTitle: 'airbnb home2',
    })
  );
};

exports.getBooking = (req, res, next) => {
  res.render('store/booking', {
    pageTitle: 'My booking',
  });
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetch((registeredHouse) =>
    res.render('store/favourite', {
      registeredHouse: registeredHouse,
      pageTitle: 'My favourite',
    })
  );
};
