import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../utils/data';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [qty, setQty]             = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded]         = useState(false);

  const product = PRODUCTS.find(p => p._id === id);
  if (!product) return (
    <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--muted)' }}>
      <p>Product not found.</p>
      <button onClick={() => navigate('/shop')} style={{ marginTop: 16, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px 24px', borderRadius: 20, fontWeight: 600 }}>
        Back to Shop
      </button>
    </div>
  );

  const related = PRODUCTS.filter(p => p._id !== id && p.category === product.category).slice(0, 3);
  const isWished = isWishlisted(product._id);

  const sampleReviews = [
    { name: 'Jessica T.', rating: 5, date: 'Mar 15, 2026', text: 'Absolutely love this! My skin feels so much better after just 2 weeks.', avatar: 'J' },
    { name: 'Maria S.',   rating: 4, date: 'Feb 28, 2026', text: 'Great formula, very gentle. The texture is perfect — not too heavy.', avatar: 'M' },
    { name: 'Lily K.',    rating: 5, date: 'Feb 12, 2026', text: 'My dermatologist even noticed the improvement! Now a permanent fixture in my routine.', avatar: 'L' },
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container">
        <button onClick={() => navigate('/shop')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>
          ← Back to Shop
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', marginBottom: 48 }}>
          {/* Image */}
          <div style={{ background: 'var(--bg-2)', borderRadius: 20, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110, border: '1px solid var(--border)' }}>
            {product.image}
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span style={{ display: 'inline-block', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 10, marginBottom: 12, textTransform: 'uppercase' }}>
                {product.badge}
              </span>
            )}
            <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
              {product.category}
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--text)', margin: '0 0 12px', fontWeight: 400 }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <StarRating rating={product.rating} size={16} />
              <span style={{ color: 'var(--muted)', fontSize: 14 }}>{product.rating} ({product.numReviews} reviews)</span>
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>${product.price}</div>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{product.description}</p>

            {/* Skin types */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Good for</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.skinTypes.map(s => (
                  <span key={s} style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
                    {s} skin
                  </span>
                ))}
              </div>
            </div>

            {/* Qty + Cart */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 20 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', color: 'var(--text)', fontSize: 18 }}>−</button>
                <span style={{ padding: '8px 12px', fontSize: 15, color: 'var(--text)', minWidth: 32, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', color: 'var(--text)', fontSize: 18 }}>+</button>
              </div>
              <button
                onClick={() => { addToCart(product, qty); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
                style={{ flex: 1, background: added ? '#52b788' : 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '12px 24px', borderRadius: 24, fontSize: 14, fontWeight: 600, transition: 'background 0.3s' }}
              >
                {added ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                style={{ background: isWished ? 'var(--accent-light)' : 'transparent', border: '1px solid var(--border)', cursor: 'pointer', padding: 12, borderRadius: 12, fontSize: 18, display: 'flex', alignItems: 'center' }}
              >
                {isWished ? '❤️' : '🤍'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Free shipping over $50', 'Clean formula', 'Dermatologist tested'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
                  <span style={{ color: '#52b788' }}>✓</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div>
          <div style={{ display: 'flex', borderBottom: '2px solid var(--border)', marginBottom: 28 }}>
            {['description', 'ingredients', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, textTransform: 'capitalize',
                color: activeTab === tab ? 'var(--accent)' : 'var(--muted)',
                borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
                marginBottom: -2,
              }}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div style={{ color: 'var(--muted)', lineHeight: 1.8, maxWidth: 700 }}>
              <p style={{ marginBottom: 12 }}>{product.description}</p>
              <p style={{ marginBottom: 12 }}>Formulated without parabens, sulfates, or artificial fragrances. Dermatologist tested and hypoallergenic.</p>
              <p><strong style={{ color: 'var(--text)' }}>How to use:</strong> Apply a small amount to clean, dry skin. Gently massage until fully absorbed. Use morning and/or evening.</p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Key active ingredients:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                {product.ingredients.map(ing => (
                  <div key={ing} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#52b788', fontSize: 16 }}>🌿</span>
                    <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--text)' }}>{product.rating}</div>
                  <StarRating rating={product.rating} size={20} />
                  <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>{product.numReviews} reviews</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {sampleReviews.map(r => (
                  <div key={r.name} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{r.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{r.name}</div>
                        <div style={{ color: 'var(--muted)', fontSize: 12 }}>{r.date}</div>
                      </div>
                      <div style={{ marginLeft: 'auto' }}><StarRating rating={r.rating} size={13} /></div>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--text)', fontWeight: 400, marginBottom: 24 }}>You might also like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {related.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
