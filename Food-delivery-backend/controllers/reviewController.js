const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  try {
    const { restaurant, rating, comment } = req.body;
    
    if (!restaurant || !rating) {
      return res.status(400).json({ message: "Restaurant ID and rating are required" });
    }
    
    const review = await Review.create({
      user: req.user.id,
      restaurant: restaurant,
      rating: rating,
      comment: comment
    });
    
    // Populate user data for response
    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name')
      .populate('restaurant', 'name');
    
    res.json(populatedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ message: error.message });
  }
};