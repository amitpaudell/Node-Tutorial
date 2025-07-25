const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
  res.render('addHome', { pageTitle: 'Add Home' });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, ppn, location, rating } = req.body;
  const home = new Home(houseName, ppn, location, rating);
  home.save();
  res.render('homeAdded', { pageTitle: 'home is added' });
};

exports.getHomes = (req, res, next) => {
  const registeredHouse = Home.fetch();
  res.render('home', {
    registeredHouse: registeredHouse,
    pageTitle: 'airbnb home2',
  });
};
