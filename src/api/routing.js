// ========== Global Dependencies ============ // 
const express = require('express')
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// ========== Local Dependencies ============= //
const dbOperations = require('./routeFunctions');
const config = require('../config');

// ========== Setting Up Middlewares ============= //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ========== Auth Route to get JWT token ============= //
router.post('/authenticate', dbOperations.authenticateUser );

// ========== JWT check for All Routes ============= //
router.use( (req, res, next) => {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, config.jwtSecret, (err, decoded)  => {
      if (err) {
        return res.json(
          { 
            success: false, 
            message: 'Failed to authenticate token.' 
          }
        );
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});


// ========== All API Routes Below ============= //
router.get('/users', dbOperations.getAllUsers );

router.get('/user/:id', (req, res) => {
  res.json('user/id');
});

router.post('/add-user', (req, res) => {
  res.json('add-user');
});

router.post('/add-test-user', dbOperations.saveATestUser );

router.post('/upload-file', upload.single('avatar'), dbOperations.uploadImage );




module.exports = router;


