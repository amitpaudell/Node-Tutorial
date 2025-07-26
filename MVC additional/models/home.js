const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const { error } = require('console');

module.exports = class Home {
  constructor(houseName, price, location, rating) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
  }

  save() {
    Home.fetch((registeredHouse) => {
      registeredHouse.push(this);
      const homepathdata = path.join(rootDir, 'data', 'home.json');
      fs.writeFile(homepathdata, JSON.stringify(registeredHouse), (error) => {
        console.log('File Writing Concluded', error);
      });
    });
  }

  static fetch(callback) {
    const homepath = path.join(rootDir, 'data', 'home.json');
    fs.readFile(homepath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
