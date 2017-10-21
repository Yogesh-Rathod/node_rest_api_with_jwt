const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
  name: String,
  path: String
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;