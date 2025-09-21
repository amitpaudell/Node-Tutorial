const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const registerdHomes = [];

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.random().toString();
    Home.fetchAll((registerdHomes) => {
      registerdHomes.push(this);
      const homeDataPath = path.join(rootDir, 'data', 'home.json');
      fs.writeFile(homeDataPath, JSON.stringify(registerdHomes), (error) => {
        console.log('File Writing concluded');
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'data', 'home.json');
    fs.readFile(homeDataPath, (err, data) => {
      console.log('File read', err, data);
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    Home.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }
};
