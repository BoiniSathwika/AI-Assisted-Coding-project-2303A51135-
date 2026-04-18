const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const { protect, generateToken } = require('../middleware/auth');

// ── POST /api/users/register ─────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, error: 'Please provide name, email and password' });

    if (await User.findOne({ email }))
      return res.status(400).json({ success: false, error: 'Email already registered' });

    const user  = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, skinType: user.skinType },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── POST /api/users/login ────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, error: 'Please provide email and password' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, skinType: user.skinType },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/users/me ────────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist', 'name price image category rating');
  res.json({ success: true, user });
});

// ── PUT /api/users/profile ───────────────────────────────────────
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, skinType } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, skinType },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ── PUT /api/users/wishlist/:productId — toggle ──────────────────
router.put('/wishlist/:productId', protect, async (req, res) => {
  try {
    const user      = await User.findById(req.user._id);
    const productId = req.params.productId;
    const idx       = user.wishlist.indexOf(productId);
    if (idx > -1) user.wishlist.splice(idx, 1);
    else          user.wishlist.push(productId);
    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── PUT /api/users/change-password ──────────────────────────────
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    if (!(await user.comparePassword(currentPassword)))
      return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
