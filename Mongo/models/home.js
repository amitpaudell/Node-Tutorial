const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const Favourite = require('./favourite');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registerdHomes) => {
      if (this.id) {
        registerdHomes = registerdHomes.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        this.id = Math.random().toString();
        registerdHomes.push(this);
      }
      const homeDataPath = path.join(rootDir, 'data', 'home.json');
      fs.writeFile(homeDataPath, JSON.stringify(registerdHomes), (error) => {
        console.log('File Writing concluded');
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'data', 'home.json');
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    Home.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }

  static deleteById(homeId, callback) {
    Home.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);

      const homeDataPath = path.join(rootDir, 'data', 'home.json');
      fs.writeFile(homeDataPath, JSON.stringify(homes), (error) => {
        Favourite.deleteFavourite(homeId, callback);
      });
    });
  }
};
