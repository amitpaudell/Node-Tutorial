const registeredHomes = [];

exports.getHomes = (req, res, next) => {
  res.render('home', {
    registeredHomes: registeredHomes,
    pageTitle: 'airbnb Home',
    currentPage: 'Home',
  });
};

exports.getAddHome = (req, res, next) => {
  res.render('add-home', {
    pageTitle: 'Add your home',
    currentPage: 'AddHome',
  });
};

exports.postAddHome = (req, res, next) => {
  registeredHomes.push({
    houseName: req.body.houseName,
    pricePerNight: req.body.ppn,
    location: req.body.location,
    rating: req.body.rating,
    photo: req.body.photo,
  });
  res.render('homeadded', { pageTitle: 'Home added', currentPage: 'AddHome' });
};
