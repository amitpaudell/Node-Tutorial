const Home = require('../models/home');
const fs = require('fs');
exports.getAddHome = (req, res, next) => {
  res.render('admin/edit-home', {
    pageTitle: 'Add your home',
    currentPage: 'AddHome',
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, ppn, location, rating, description } = req.body;
  console.log(houseName, ppn, location, rating, description);
  console.log(req.file);
  if (!req.file) {
    return res.status(422).send('No image provided');
  }
  const photo = req.file.path;
  const home = new Home({
    houseName: houseName,
    price: ppn,
    location: location,
    rating: rating,
    photoUrl: photo,
    description: description,
  });
  home.save().then(() => {
    console.log('Home saved sucessfully');
  });
  res.render('admin/homeadded', {
    pageTitle: 'Home added',
    currentPage: 'AddHome',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render('admin/admin-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Host Home List',
      currentPage: 'host-homes',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect('/host/admin-home-list');
    }
    res.render('admin/edit-home', {
      home: home,
      pageTitle: 'EditHome',
      currentPage: 'host-homes',
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, ppn, location, rating, description } = req.body;

  Home.findById(id).then((home) => {
    home.houseName = houseName;
    home.price = ppn;
    home.location = location;
    home.rating = rating;
    home.description = description;
    if (req.file) {
      fs.unlink(home.photoUrl, (err) => {
        if (err) {
          console.log('Error while deleting file', err);
        }
      });

      home.photoUrl = req.file.path;
    }

    home.save().then((result) => {
      console.log('home updated', result);
    });
  });

  res.redirect('/host/admin-home-list');
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect('/host/admin-home-list');
    })
    .catch((error) => {
      console.log('Error while deleting', error);
    });
};
