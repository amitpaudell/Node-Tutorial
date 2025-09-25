const Favourite = require('../models/favourite');
const Home = require('../models/home');

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/index', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb ',
      currentPage: 'index',
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'Home-List',
    });
  });
};
exports.getBookings = (req, res, next) => {
  res.render('store/booking', {
    pageTitle: 'My Booking',
    currentPage: 'Bookings',
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite((favourite) => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourite.includes(home.id)
      );
      res.render('store/favourite-list', {
        favouriteHomes: favouriteHomes,
        pageTitle: 'Favourite Home',
        currentPage: 'Favourite',
      });
    });
  });
};

exports.postAddFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log('Error while marking favourite');
    }
    res.redirect('/favourite');
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log('home not found');
      res.redirect('/homes');
    } else {
      res.render('store/home-detail', {
        home: home,
        pageTitle: 'Home-detail',
        currentPage: 'Home',
      });
    }
  });
};

exports.deleteFav = (req, res, next) => {
  const favId = req.params.favId;
  console.log(favId);
  Favourite.deleteFavourite(favId, (error) => {
    if (error) {
      console.log('Error while deleting favourite list');
    }
    res.redirect('/favourite');
  });
};
