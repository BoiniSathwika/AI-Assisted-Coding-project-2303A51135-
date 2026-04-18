const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating:  { type: Number, required: [true, 'Rating is required'], min: 1, max: 5 },
  title:   { type: String, maxlength: 100 },
  comment: { type: String, required: [true, 'Comment is required'], maxlength: 500 },
  isVerifiedPurchase: { type: Boolean, default: false },
  helpfulVotes:       { type: Number, default: 0 },
}, { timestamps: true });

// One review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Auto-update product rating after save / remove
const updateProductRating = async (productId) => {
  const stats = await mongoose.model('Review').aggregate([
    { $match: { product: productId } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (stats.length > 0) {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      rating:     Math.round(stats[0].avgRating * 10) / 10,
      numReviews: stats[0].count,
    });
  }
};

reviewSchema.post('save',   function () { updateProductRating(this.product); });
reviewSchema.post('remove', function () { updateProductRating(this.product); });

module.exports = mongoose.model('Review', reviewSchema);
