// ========== Global Dependencies ============ // 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// ========== Local Dependencies ============= //
const dummyData = require('./src/dummyData');
const config = require('./src/config');
const routes = require('./src/api/routing');

// ========== Config Options For Middlewares ============= //
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200
};

// ========== Setting Up PORT ============= //
const PORT = process.env.PORT || 3000;

// ========== Setting Up Middlewares ============= //
app.use(cors(corsOptions));
app.use(express.static('public', options));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ========== Connect To MongoDB through Mongoose ============= //
mongoose.connect(config.dbConnection(), { useMongoClient: true } );

// ========== API Routing ============= //
app.use('/api', routes );

// ========== Home Page Routing ============= //
app.get('/', function (req, res) {
  res.json(dummyData.users);
});

// ========== Listen to Requests ============= //
app.listen(PORT, () => {
  console.log("App is running at PORT ", PORT);
});
