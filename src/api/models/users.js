const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  age: { type: Number, min: 18, max: 65 },
  admin: Boolean
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;