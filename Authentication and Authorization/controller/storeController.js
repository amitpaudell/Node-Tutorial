const Favourite = require('../models/favourite');
const Home = require('../models/home');

exports.getIndex = (req, res, next) => {
  console.log('Session Value ', req.session);
  Home.find().then((registeredHomes) => {
    console.log(registeredHomes);
    res.render('store/index', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb ',
      currentPage: 'index',
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render('store/home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'Home-List',
      isLoggedIn: req.isLoggedIn,
    });
  });
};
exports.getBookings = (req, res, next) => {
  res.render('store/booking', {
    pageTitle: 'My Booking',
    currentPage: 'Bookings',
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId.toString());

    Home.find().then((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render('store/favourite-list', {
        favouriteHomes: favouriteHomes,
        pageTitle: 'Favourite Home',
        currentPage: 'Favourite',
        isLoggedIn: req.isLoggedIn,
      });
    });
  });
};

exports.postAddFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId })
    .then((fav) => {
      if (fav) {
        console.log('Already marked as favourite');
      } else {
        fav = new Favourite({ houseId: homeId });
        fav.save().then((result) => {
          console.log('Fav added', result);
        });
      }

      res.redirect('/favourite');
    })
    .catch((error) => {
      console.log('Error while marking favourites', error);
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log('home not found');
      res.redirect('/homes');
    } else {
      res.render('store/home-detail', {
        home: home,
        pageTitle: 'Home-detail',
        currentPage: 'Home',
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};

exports.deleteFav = (req, res, next) => {
  const favId = req.params.favId;
  console.log(favId);
  Favourite.findOneAndDelete({ houseId: favId })
    .then((result) => {
      console.log('Fav removed', result);
    })
    .catch((err) => {
      console.log('Error while removing favourite', err);
    })
    .finally(() => {
      res.redirect('/favourite');
    });
};
