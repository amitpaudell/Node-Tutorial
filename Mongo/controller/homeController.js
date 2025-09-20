const Home = require('../models/home');

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('home', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'Home',
    });
  });
};

exports.getAddHome = (req, res, next) => {
  res.render('add-home', {
    pageTitle: 'Add your home',
    currentPage: 'AddHome',
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, ppn, location, rating, photo } = req.body;
  const home = new Home(houseName, ppn, location, rating, photo);
  home.save();
  res.render('homeadded', { pageTitle: 'Home added', currentPage: 'AddHome' });
};
