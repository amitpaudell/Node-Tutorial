const { getDB } = require('../utils/databaseUtil');
const Favourite = require('./favourite');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    const db = getDB();
    return db.collection('homes').insertOne(this);
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId, callback) {}

  static deleteById(homeId, callback) {}
};
