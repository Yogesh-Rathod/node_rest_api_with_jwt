// ========== Global Dependencies ============ // 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// ========== Local Dependencies ============= //
const Users = require('./models/users');
const Upload = require('./models/Upload');
const config = require('../config');

// ========== Setting Up Middlewares ============= //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {
  // ========== Get List of Users ============= //
  getAllUsers: (req, res) => {

    Users.find({}, (error, userData) => {
      if (error) {
        res.status(500).send('Something went wrong!!!!');
      }
      const response = {
        status: 200,
        message: 'Everything is Cool!',
        data: userData
      };

      res.send(response);   
    });
  },

  // ========== Save a Test User ============= //
  saveATestUser: (req, res) => {
    
    var newUser = new Users(req.body);

    // save the sample user
    newUser.save( (error, savedData) => {
      if (error) {
        res.status(500).send('Something went wrong!!!!');
      } else {
        const response = {
          status: 200,
          message: 'Everything is Cool!',
          data: 'User saved Sucessfully'
        };

        res.json(response);
      }
    });

  },

  // ========== Authenticate User ============= //
  authenticateUser: (req, res) => {

    // find the user
    Users.findOne({
      name: req.body.name
    }, (err, user) => {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          
          const payload = {
            admin: user.admin
          };
          
          const token = jwt.sign(payload, config.jwtSecret, {});

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }

      }

    });
  },


  uploadImage: (req, res) => {
    if (req.file) {
      const Image = new Upload({
        name: req.file.originalname,
        path: req.file.path
      });
      Image.save( (error, success) => {
        if (error) {
          res.status(500).send('Something went wrong. Could not upload!!!!');
        }
        const response = {
          status: 200,
          message: 'Everything is Cool!',
          data: 'Image saved Sucessfully'
        };
    
        res.json(response);
      })
    } else {
      res.status(500).send('No file found to upload!!!!');
    }

  }

};
