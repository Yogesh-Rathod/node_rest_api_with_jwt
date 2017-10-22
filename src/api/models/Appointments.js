const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = mongoose.Schema({
  custId: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  // petId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Pet"
  // },
  appointmentDate: String,
  appointmentTime: String 
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;