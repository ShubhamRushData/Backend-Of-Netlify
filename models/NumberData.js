const mongoose = require('mongoose');

const NumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('NumberData', NumberSchema);
