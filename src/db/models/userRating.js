const mongoose = require('mongoose');

const userRatingSchema = new mongoose.Schema({
  userId: String,
  byUserId: String,
  rating: Number,
  reason: String,
});

const UserRating = mongoose.model('UserRating', userRatingSchema);

module.exports = UserRating;
