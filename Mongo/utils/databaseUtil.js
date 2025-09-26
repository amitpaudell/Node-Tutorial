const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const MONGO_URI =
  'mongodb+srv://amitpaudel789_db_user:ijkl@cluster0.qlsmiwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URI)
    .then((client) => {
      callback(client);
    })
    .catch((error) => {
      console.log('Error connecting with mongodb ', error);
    });
};

module.exports = mongoConnect;
