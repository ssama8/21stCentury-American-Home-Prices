const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  name: String,
  abbrev: String,
  prices: Array,
});

module.exports = mongoose.model('State', StateSchema, 'States');
