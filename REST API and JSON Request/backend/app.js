//Core Modules
const path = require('path');

//External Module
const express = require('express');
const mongoose = require('mongoose');

//Local Module
const errorController = require('./controllers/errorController');

const DB_PATH =
  'mongodb+srv://root:root@projectair.7zivzfv.mongodb.net/todo?retryWrites=true&w=majority&appName=projectAir';

const app = express();

app.use(express.urlencoded());
app.use(errorController.pageNotFound);

const PORT = 3000;
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log('Connect to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error while connection to mongodb', err);
  });
