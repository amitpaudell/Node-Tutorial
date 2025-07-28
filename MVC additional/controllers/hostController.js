const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
  res.render('host/addHome', { pageTitle: 'Add Home' });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetch((registeredHouse) =>
    res.render('host/host-home-list', {
      registeredHouse: registeredHouse,
      pageTitle: 'My favourite',
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, ppn, location, rating } = req.body;
  const home = new Home(houseName, ppn, location, rating);
  home.save();
  res.render('host/homeAdded', { pageTitle: 'home is added' });
};
