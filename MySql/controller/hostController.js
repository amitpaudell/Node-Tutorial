const Home = require('../models/home');

exports.getAddHome = (req, res, next) => {
  res.render('admin/edit-home', {
    pageTitle: 'Add your home',
    currentPage: 'AddHome',
    editing: false,
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, ppn, location, rating, photo, description } = req.body;
  const home = new Home(houseName, ppn, location, rating, photo, description);
  home.save();
  res.render('admin/homeadded', {
    pageTitle: 'Home added',
    currentPage: 'AddHome',
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
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
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
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
  const { id, houseName, ppn, location, rating, photo, description } = req.body;
  const home = new Home(
    houseName,
    ppn,
    location,
    rating,
    photo,
    description,
    id
  );

  home.save();

  res.redirect('/host/admin-home-list');
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId)
    .then(() => {
      res.redirect('/host/admin-home-list');
    })
    .catch((error) => {
      console.log('Error while deleting', error);
    });
};
