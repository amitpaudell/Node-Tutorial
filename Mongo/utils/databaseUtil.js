const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const MONGO_URI =
  'mongodb+srv://root:root@projectair.7zivzfv.mongodb.net/?retryWrites=true&w=majority&appName=projectAir';

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URI)
    .then((client) => {
      _db = client.db('airbnb');
      callback();
    })
    .catch((error) => {
      console.log('Error connecting with mongodb ', error);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error('Database not connected');
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
