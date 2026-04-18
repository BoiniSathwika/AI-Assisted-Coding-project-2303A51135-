const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const Product = require('../models/Product');
const Order   = require('../models/Order');
const Review  = require('../models/Review');
const { protect, adminOnly } = require('../middleware/auth');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// ── GET /api/admin/stats ─────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [userCount, productCount, orders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Order.find().select('totalAmount isPaid status createdAt'),
    ]);
    const revenue      = orders.reduce((sum, o) => sum + (o.isPaid ? o.totalAmount : 0), 0);
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const thisMonth    = orders.filter(o => {
      const d = new Date(o.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const monthlyRevenue = thisMonth.reduce((sum, o) => sum + (o.isPaid ? o.totalAmount : 0), 0);

    res.json({
      success: true,
      stats: { userCount, productCount, orderCount: orders.length, revenue, pendingCount, monthlyRevenue },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── PRODUCTS ─────────────────────────────────────────────────────

// GET /api/admin/products — all products (including inactive)
router.get('/products', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json({ success: true, count: products.length, products });
});

// POST /api/admin/products — create
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/admin/products/:id — update
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/admin/products/:id — soft-delete (deactivate)
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, message: 'Product deactivated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── ORDERS ───────────────────────────────────────────────────────

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/admin/orders/:id/status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updates = { status };
    if (status === 'delivered') { updates.isDelivered = true; updates.deliveredAt = Date.now(); }
    const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── USERS ────────────────────────────────────────────────────────

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/admin/users/:id — update role
router.put('/users/:id', async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/admin/reviews/:id
router.delete('/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
