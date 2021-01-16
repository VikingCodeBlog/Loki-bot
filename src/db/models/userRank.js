const mongoose = require('mongoose');

const userRankSchema = new mongoose.Schema({
  userId: String,
  rank: Number,
  lastUpdate: Date
});

const UserRank = mongoose.model('UserRank', userRankSchema);

module.exports = UserRank;