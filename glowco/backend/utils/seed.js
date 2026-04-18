/**
 * GlowCo Database Seeder
 * Run with: node utils/seed.js
 * Clears all data and inserts fresh sample data.
 */

const mongoose = require('mongoose');
require('dotenv').config();

const User    = require('../models/User');
const Product = require('../models/Product');
const Order   = require('../models/Order');
const Review  = require('../models/Review');

const PRODUCTS = [
  {
    name: 'Gentle Foam Cleanser',
    description: 'A ultra-gentle foam cleanser that removes impurities without stripping the skin barrier. pH-balanced formula with niacinamide to minimize pores and green tea to soothe inflammation.',
    price: 24, category: 'Cleanser', image: '🧴',
    ingredients: ['Niacinamide','Aloe Vera','Green Tea Extract','Glycerin'],
    skinTypes: ['oily','combination','sensitive'],
    stock: 100, rating: 4.8, numReviews: 142, badge: 'Bestseller', isFeatured: true,
  },
  {
    name: 'Hydra-Boost Moisturizer',
    description: 'Intense 72-hour hydration with triple-action hyaluronic acid complex. Ceramide-rich formula repairs the skin barrier for visibly plumper, smoother skin.',
    price: 38, category: 'Moisturizer', image: '🫧',
    ingredients: ['Hyaluronic Acid','Ceramides','Shea Butter','Peptides'],
    skinTypes: ['dry','combination','sensitive'],
    stock: 75, rating: 4.9, numReviews: 289, badge: 'New', isFeatured: true,
  },
  {
    name: 'Vitamin C Brightening Serum',
    description: 'High-potency 15% L-Ascorbic Acid serum stabilized with Ferulic Acid and Vitamin E. Visibly brightens and evens skin tone in 2 weeks.',
    price: 52, category: 'Serum', image: '✨',
    ingredients: ['15% Vitamin C','Ferulic Acid','Vitamin E','Niacinamide'],
    skinTypes: ['all'],
    stock: 60, rating: 4.7, numReviews: 198, badge: 'Fan Fave', isFeatured: true,
  },
  {
    name: 'SPF 50+ Invisible Sunscreen',
    description: 'Broad-spectrum mineral sunscreen with zero white cast. Lightweight, non-greasy. Fragrance-free and reef-safe.',
    price: 29, category: 'Sunscreen', image: '☀️',
    ingredients: ['Zinc Oxide','Titanium Dioxide','Vitamin E','Squalane'],
    skinTypes: ['all'],
    stock: 120, rating: 4.6, numReviews: 312, badge: 'SPF 50+', isFeatured: true,
  },
  {
    name: 'Retinol Night Serum',
    description: 'Encapsulated retinol technology for minimal irritation and maximum anti-aging efficacy. Paired with bakuchiol for synergistic effect on fine lines.',
    price: 64, category: 'Serum', image: '🌙',
    ingredients: ['0.3% Retinol','Bakuchiol','Peptides','Niacinamide'],
    skinTypes: ['normal','combination','oily'],
    stock: 45, rating: 4.5, numReviews: 87, badge: null, isFeatured: false,
  },
  {
    name: 'Barrier Repair Cream',
    description: 'Restores and strengthens the skin\'s natural moisture barrier with the optimal ceramide ratio. Clinically proven to reduce sensitivity in 1 week.',
    price: 44, category: 'Moisturizer', image: '🛡️',
    ingredients: ['Ceramides','Fatty Acids','Cholesterol','Oat Extract'],
    skinTypes: ['dry','sensitive'],
    stock: 80, rating: 4.9, numReviews: 156, badge: 'Dermatologist Pick', isFeatured: false,
  },
  {
    name: 'BHA Exfoliant Toner',
    description: 'Gentle 2% salicylic acid exfoliant that deeply unclogs pores, reduces blackheads, and controls excess sebum.',
    price: 32, category: 'Cleanser', image: '💧',
    ingredients: ['2% Salicylic Acid','Witch Hazel','Zinc PCA','Tea Tree'],
    skinTypes: ['oily','combination'],
    stock: 90, rating: 4.4, numReviews: 203, badge: null, isFeatured: false,
  },
  {
    name: 'Peptide Eye Cream',
    description: 'Advanced peptide eye cream targeting dark circles, puffiness, and fine lines. Caffeine + Matrixyl 3000 for visible results.',
    price: 48, category: 'Serum', image: '👁️',
    ingredients: ['Matrixyl 3000','Caffeine','Hyaluronic Acid','Retinol'],
    skinTypes: ['all'],
    stock: 55, rating: 4.7, numReviews: 94, badge: 'New', isFeatured: false,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear
    await Promise.all([User.deleteMany(), Product.deleteMany(), Order.deleteMany(), Review.deleteMany()]);
    console.log('🗑  Cleared existing data');

    // Admin user
    const admin = await User.create({
      name: 'Admin User', email: 'admin@glowco.com',
      password: 'admin123', role: 'admin', skinType: 'combination',
    });

    // Sample customer
    const customer = await User.create({
      name: 'Priya Mehta', email: 'priya@example.com',
      password: 'password123', skinType: 'oily',
    });

    // Products
    const products = await Product.insertMany(PRODUCTS);
    console.log(`📦 Created ${products.length} products`);

    // Sample order
    const order = await Order.create({
      user:            customer._id,
      items: [{ product: products[0]._id, name: products[0].name, price: products[0].price, quantity: 2, image: products[0].image }],
      shippingAddress: { name: 'Priya Mehta', address: '12 MG Road', city: 'Hyderabad', postalCode: '500001', country: 'IN' },
      paymentInfo:     { method: 'card', status: 'paid' },
      itemsTotal:      48, shippingCost: 0, tax: 2.40, totalAmount: 50.40,
      isPaid: true, paidAt: new Date(), status: 'delivered',
      isDelivered: true, deliveredAt: new Date(),
    });

    // Sample review
    await Review.create({
      user: customer._id, product: products[0]._id,
      rating: 5, title: 'Holy grail cleanser!',
      comment: 'This cleanser is so gentle yet effective. My skin feels clean without any tightness. Perfect for my oily skin!',
      isVerifiedPurchase: true,
    });

    console.log('👤 Admin:    admin@glowco.com   / admin123');
    console.log('👤 Customer: priya@example.com  / password123');
    console.log('🌸 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
};

seed();
