const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const favouriteDataPath = path.join(rootDir, 'data', 'favourite.json');
module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourite((favourites) => {
      if (favourites.includes(homeId)) {
        callback('this home is already added to favourite list');
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourite(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
