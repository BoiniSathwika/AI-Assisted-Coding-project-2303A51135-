const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

// ── GET /api/products ────────────────────────────────────────────
// Query: ?category=Serum&skinType=oily&minPrice=10&maxPrice=60&sort=rating&search=vitamin&page=1&limit=12
router.get('/', async (req, res) => {
  try {
    const { category, skinType, minPrice, maxPrice, sort, search, page = 1, limit = 12 } = req.query;

    const query = { isActive: true };
    if (category) query.category = category;
    if (skinType) query.skinTypes = { $in: [skinType, 'all'] };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) query.$text = { $search: search };

    const sortMap = {
      popular:    { numReviews: -1 },
      rating:     { rating: -1 },
      'price-low':  { price: 1 },
      'price-high': { price: -1 },
      newest:     { createdAt: -1 },
    };
    const sortBy = sortMap[sort] || sortMap.popular;

    const total    = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortBy)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json({
      success: true, count: products.length, total,
      pages: Math.ceil(total / limit), currentPage: Number(page),
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/products/featured ───────────────────────────────────
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true, isFeatured: true }).sort({ rating: -1 }).limit(8);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/products/recommend/:skinType ────────────────────────
router.get('/recommend/:skinType', async (req, res) => {
  try {
    const { skinType } = req.params;
    const products = await Product.find({
      isActive: true,
      skinTypes: { $in: [skinType, 'all'] },
    }).sort({ rating: -1 }).limit(6);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/products/:id ────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
