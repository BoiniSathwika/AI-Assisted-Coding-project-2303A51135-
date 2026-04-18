const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image:    String,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    name:       { type: String, required: true },
    address:    { type: String, required: true },
    city:       { type: String, required: true },
    postalCode: { type: String, required: true },
    country:    { type: String, required: true, default: 'IN' },
  },
  paymentInfo: {
    method:               { type: String, default: 'card' },
    stripePaymentIntentId: String,
    status:               { type: String, default: 'pending' },
  },
  itemsTotal:  { type: Number, required: true },
  shippingCost:{ type: Number, required: true, default: 0 },
  tax:         { type: Number, required: true, default: 0 },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending','confirmed','processing','shipped','delivered','cancelled','refunded'],
    default: 'pending',
  },
  isPaid:       { type: Boolean, default: false },
  paidAt:       Date,
  isDelivered:  { type: Boolean, default: false },
  deliveredAt:  Date,
  trackingNumber: String,
  notes:        String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
