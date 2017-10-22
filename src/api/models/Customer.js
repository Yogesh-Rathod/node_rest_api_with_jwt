const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointment = require('./Appointments');

const customerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    city: String,
    state: String,
    country: {
      type: String,
      required: true
    },
  },
  contact: {
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      "type": String,
      "pattern": "^([0-9]{3}-[0-9]{3}-[0-9]{4}$"
    }
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment"
  },

});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;