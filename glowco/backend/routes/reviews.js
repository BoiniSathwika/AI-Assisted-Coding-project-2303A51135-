const express = require('express');
const router  = express.Router();
const Review  = require('../models/Review');
const Order   = require('../models/Order');
const { protect } = require('../middleware/auth');

// ── GET /api/reviews/product/:productId ─────────────────────────
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── POST /api/reviews/:productId — add review ────────────────────
router.post('/:productId', protect, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    if (!rating || !comment)
      return res.status(400).json({ success: false, error: 'Rating and comment are required' });

    const productId = req.params.productId;

    // Check for duplicate
    const existing = await Review.findOne({ user: req.user._id, product: productId });
    if (existing)
      return res.status(400).json({ success: false, error: 'You have already reviewed this product' });

    // Verified purchase check
    const purchase = await Order.findOne({
      user: req.user._id,
      'items.product': productId,
      status: 'delivered',
    });

    const review = await Review.create({
      user:    req.user._id,
      product: productId,
      rating, title, comment,
      isVerifiedPurchase: !!purchase,
    });

    const populated = await review.populate('user', 'name');
    res.status(201).json({ success: true, review: populated });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ success: false, error: 'You have already reviewed this product' });
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── DELETE /api/reviews/:id — delete own review ──────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, error: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ success: false, error: 'Not authorized' });
    await review.deleteOne();
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
