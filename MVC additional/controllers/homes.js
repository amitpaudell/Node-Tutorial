const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
  res.render('host/addHome', { pageTitle: 'Add Home' });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, ppn, location, rating } = req.body;
  const home = new Home(houseName, ppn, location, rating);
  home.save();
  res.render('host/homeAdded', { pageTitle: 'home is added' });
};

exports.getHomes = (req, res, next) => {
  const registeredHouse = Home.fetch((registeredHouse) =>
    res.render('store/home', {
      registeredHouse: registeredHouse,
      pageTitle: 'airbnb home2',
    })
  );
};
