// ========== Global Dependencies ============ // 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// ========== Local Dependencies ============= //
const Users = require('./models/users');
const Upload = require('./models/Upload');
const Customer = require('./models/Customer');
const Pet = require('./models/Pet');
const Appointment = require('./models/Appointments');
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

  // ========== Get List of Customers ============= //
  getAllCustomers: (req, res) => {

    Customer.find({}, (error, customerData) => {
      if (error) {
        res.status(500).send('Something went wrong!!!!');
      }
      const response = {
        status: 200,
        message: 'Everything is Cool!',
        data: customerData
      };

      res.send(response);
    });
  },

  // ========== Save a Test Customer ============= //
  saveATestCustomer: (req, res) => {

    var newCustomer = new Customer(req.body);
    
    // save the sample user
    newCustomer.save((error, savedData) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const response = {
          status: 200,
          message: 'Everything is Cool!',
          data: 'Customer saved Sucessfully'
        };

        const appointmentInfo = new Appointment({
          custId: newCustomer._id,
          appointmentDate: '01/01/2017',
          appointmentTime: '12:00 AM'
        });

        appointmentInfo.save((error, saved) => {
          if (error) {
            res.status(500).send(error);
          }
        });

        res.json(response);
      }
    });

  },

  getCustomerById: (req, res) => {

    Customer.findOne({ _id: req.params.id })
      // .populate('Appointment')
      .exec((error, CustomerData) => {
        // console.log("CustomerData ", CustomerData);
        if (error) {
          res.status(500).send('Something went wrong!!!!');
        }

        Appointment.find({ custId: req.params.id })
        .exec((error, appointmentData) => {
          // console.log("appointmentData ", appointmentData);
          if (error) {
            res.status(500).send('Something went wrong!!!!');
          }
          // console.log("customerData ", customerData);
          let custAndAppointmentData = {
            customerData: CustomerData,
            appointmentData: appointmentData
          };
          const response = {
            status: 200,
            message: 'Everything is Cool!',
            data: custAndAppointmentData
          };

          // console.log("response.data.appointmentData ", response.data.appointmentData);
          // console.log("response ", response);
          
          res.send(response);
        });
      });
  },

  getAppointmentById: (req, res) => {

    Appointment.findOne({ _id: req.params.id })
      // .populate('Customer')
      .exec((error, AppointmentData) => {
      if (error) {
        res.status(500).send('Something went wrong!!!!');
      }
      const response = {
        status: 200,
        message: 'Everything is Cool!',
        data: AppointmentData
      };

      res.send(response);
    });
  },

  // ========== Save a Test Pet ============= //
  saveATestAppointment: (req, res) => {

    var newAppointment = new Appointment(req.body);

    // save the sample user
    newAppointment.save((error, savedData) => {
      if (error) {
        res.status(500).send(error);
      } else {
        const response = {
          status: 200,
          message: 'Everything is Cool!',
          data: 'Appointment saved Sucessfully'
        };

        res.json(response);
      }
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
      res.status(500).send({
        status: 400,
        message: 'No file found to upload!!!!'
      });
    }

  }

};
