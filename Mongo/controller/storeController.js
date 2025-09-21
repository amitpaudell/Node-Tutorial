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

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log('home not found');
      res.redirect('/homes');
    } else {
      res.render('store/home-detail', {
        home: home,
        pageTitle: 'Home-detail',
        currentPage: 'Home',
      });
    }
  });
};
