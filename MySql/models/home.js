const db = require('../utils/databaseUtil');
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
    return db.execute(
      'INSERT INTO homes (name,price,description,imageURL ,location,rating) VALUES(?,?,?,?,?,?)',
      [
        this.houseName,
        this.price,
        this.description,
        this.photoUrl,
        this.location,
        this.rating,
      ]
    );
  }

  static fetchAll(callback) {
    return db.execute('SELECT * FROM homes');
  }

  static findById(homeId, callback) {
    return db.execute('SELECT * FROM homes WHERE id=?', [homeId]);
  }

  static deleteById(homeId, callback) {
    return db.execute('DELETE  FROM homes WHERE id=?', [homeId]);
  }
};
