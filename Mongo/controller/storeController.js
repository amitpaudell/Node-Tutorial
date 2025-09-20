const Home = require('../models/home');

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'Home',
    });
  });
};
