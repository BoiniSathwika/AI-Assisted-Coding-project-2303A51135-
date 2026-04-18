const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: [true, 'Product name is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'], maxlength: 2000 },
  price:       { type: Number, required: [true, 'Price is required'], min: 0 },
  category: {
    type: String, required: true,
    enum: ['Cleanser', 'Moisturizer', 'Serum', 'Sunscreen', 'Toner', 'Eye Cream', 'Mask'],
  },
  images: [{ url: String, publicId: String }],
  image:       { type: String, default: '🧴' }, // emoji fallback
  ingredients: [String],
  skinTypes: [{
    type: String,
    enum: ['dry', 'oily', 'combination', 'sensitive', 'normal', 'all'],
  }],
  stock:      { type: Number, required: true, default: 0 },
  rating:     { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  badge:      { type: String, default: null },
  isFeatured: { type: Boolean, default: false },
  isActive:   { type: Boolean, default: true },
}, { timestamps: true });

// Full-text search index
productSchema.index({ name: 'text', description: 'text', ingredients: 'text' });
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model('Product', productSchema);
