const Home = require('../models/home');
const Favourite = require('../models/favourite');

exports.getIndex = (req, res, next) => {
  const registeredHouse = Home.fetch((registeredHouse) =>
    res.render('store/index', {
      registeredHouse: registeredHouse,
      pageTitle: 'airbnb home2',
    })
  );
};

exports.getHomes = (req, res, next) => {
  const registeredHouse = Home.fetch((registeredHouse) =>
    res.render('store/home', {
      registeredHouse: registeredHouse,
      pageTitle: 'airbnb home2',
    })
  );
};

exports.getBooking = (req, res, next) => {
  res.render('store/booking', {
    pageTitle: 'My booking',
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite((favourites) => {
    Home.fetch((registeredHouse) => {
      const favouriteHome = registeredHouse.filter((home) =>
        favourites.includes(home.id)
      );
      res.render('store/favourite', {
        favouriteHome: favouriteHome,
        pageTitle: 'My Favourite',
      });
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      res.redirect('/homes');
    } else {
      res.render('store/home-detail', {
        home: home,
        pageTitle: 'HomeDetail',
      });
    }
  });
};

exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log('Error while marking favourite ', error);
    }
    res.redirect('/favourite');
  });
};
