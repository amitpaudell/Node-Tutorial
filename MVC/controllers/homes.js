const registeredHouse = [];

exports.getAddHome = (req, res, next) => {
  res.render('addHome', { pageTitle: 'Add Home' });
};

exports.postAddHome = (req, res, next) => {
  registeredHouse.push({
    houseName: req.body.houseName,
    pricePerNight: req.body.ppn,
    location: req.body.location,
    rating: req.body.rating,
  });
  res.render('homeAdded', { pageTitle: 'home is added' });
};

exports.getHomes = (req, res, next) => {
  console.log(registeredHouse);
  res.render('home', {
    registeredHouse: registeredHouse,
    pageTitle: 'airbnb home2',
  });
};
