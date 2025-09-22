const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
  res.render('admin/edit-home', {
    pageTitle: 'Add your home',
    currentPage: 'AddHome',
    editing: false,
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

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId, (home) => {
    if (!home) {
      return res.redirect('/host/admin-home-list');
    }
    res.render('admin/edit-home', {
      home: home,
      pageTitle: 'EditHome',
      currentPage: 'host-homes',
      editing: editing,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, ppn, location, rating, photo } = req.body;
  const home = new Home(houseName, ppn, location, rating, photo);
  home.id = id;
  home.save();

  res.redirect('/host/admin-home-list');
};
