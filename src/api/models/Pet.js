const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
  name: String,
  type: String,
  dob: String,
  medicalConditions: Array
});

const Pets = mongoose.model('Pets', petSchema);

module.exports = Pets;