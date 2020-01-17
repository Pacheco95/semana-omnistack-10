const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  github_username: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
    index: true
  },
  bio: {
    type: String,
    required: true,
    default: ''
  },
  avatar_url: {
    type: String,
    required: true
  },
  techs: {
    type: [String],
    default: []
  },
  location: {
    type: PointSchema,
    index: '2dsphere',
    required: true
  }
});

module.exports = mongoose.model('Dev', DevSchema);
