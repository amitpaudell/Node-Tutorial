const Favourite = require('../models/favourite');
const Home = require('../models/home');

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    console.log(registeredHomes);
    res.render('store/index', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb ',
      currentPage: 'index',
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
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
  Favourite.getFavourite().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId);
    Home.fetchAll().then((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
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
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log('Fav added', result);
    })
    .catch((err) => {
      console.log('Error while marking favourite', err);
    })
    .finally(() => {
      res.redirect('/favourite');
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
      });
    }
  });
};

exports.deleteFav = (req, res, next) => {
  const favId = req.params.favId;
  console.log(favId);
  Favourite.deleteFavourite(favId)
    .then((result) => {
      console.log('Fav added', result);
    })
    .catch((err) => {
      console.log('Error while removing favourite', err);
    })
    .finally(() => {
      res.redirect('/favourite');
    });
};
