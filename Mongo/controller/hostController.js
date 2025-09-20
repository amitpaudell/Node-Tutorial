const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
  res.render('admin/add-home', {
    pageTitle: 'Add your home',
    currentPage: 'AddHome',
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, ppn, location, rating, photo } = req.body;
  const home = new Home(houseName, ppn, location, rating, photo);
  home.save();
  res.render('admin/homeadded', {
    pageTitle: 'Home added',
    currentPage: 'AddHome',
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('admin/admin-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Host Home List',
      currentPage: 'host-homes',
    });
  });
};
