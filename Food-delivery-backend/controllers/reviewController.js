const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  const review = await Review.create({
    ...req.body,
    user: req.user
  });
  res.json(review);
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ restaurant: req.params.id });
  res.json(reviews);
};