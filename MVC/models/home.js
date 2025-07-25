const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const registeredHouse = [];

module.exports = class Home {
  constructor(houseName, price, location, rating) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
  }

  save() {
    registeredHouse.push(this);
    const homeDataPath = path.join(rootDir, 'data', 'home.json');
    fs.writeFile(homeDataPath, JSON.stringify(registeredHouse), (error) => {
      console.log('File writing concluded', error);
    });
  }

  static fetch() {
    return registeredHouse;
  }
};
