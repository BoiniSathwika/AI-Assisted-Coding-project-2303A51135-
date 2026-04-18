const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { sendOrderConfirmation } = require('../utils/email');

// ── POST /api/orders — create order ─────────────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentInfo } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ success: false, error: 'No order items' });

    // Verify products and build order items (prices from DB, not client)
    const orderItems = [];
    let itemsTotal   = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ success: false, error: `Product ${item.product} not found` });
      if (product.stock < item.quantity)
        return res.status(400).json({ success: false, error: `${product.name} does not have enough stock` });

      orderItems.push({
        product:  product._id,
        name:     product.name,
        price:    product.price, // server-side price
        quantity: item.quantity,
        image:    product.images?.[0]?.url || product.image,
      });
      itemsTotal += product.price * item.quantity;
    }

    const shippingCost = itemsTotal >= 50 ? 0 : 5.99;
    const tax          = +(itemsTotal * 0.05).toFixed(2);
    const totalAmount  = +(itemsTotal + shippingCost + tax).toFixed(2);

    const order = await Order.create({
      user: req.user._id, items: orderItems,
      shippingAddress, paymentInfo,
      itemsTotal, shippingCost, tax, totalAmount,
      isPaid: true, paidAt: Date.now(), status: 'confirmed',
    });

    // Decrement stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    // Send confirmation email (non-blocking)
    sendOrderConfirmation(req.user.email, req.user.name, order).catch(console.error);

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/orders/mine ─────────────────────────────────────────
router.get('/mine', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/orders/:id ──────────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name image price');
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    // Only order owner or admin can view
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ success: false, error: 'Not authorized to view this order' });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
