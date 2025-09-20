const Home = require('../models/home');

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/index', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb ',
      currentPage: 'index',
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'Home-List',
    });
  });
};
exports.getBookings = (req, res, next) => {
  res.render('store/booking', {
    pageTitle: 'My Booking',
    currentPage: 'Bookings',
  });
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/favourite-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Favourite Home',
      currentPage: 'Favourite',
    });
  });
};
