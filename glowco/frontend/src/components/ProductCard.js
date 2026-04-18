import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [added, setAdded] = useState(false);
  const wished = isWishlisted(product._id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={() => navigate(`/shop/${product._id}`)}
      style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        cursor: 'pointer', position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      {/* Badge */}
      {product.badge && (
        <span style={{
          position: 'absolute', top: 12, left: 12, zIndex: 1,
          background: 'var(--accent)', color: '#fff',
          fontSize: 10, fontWeight: 700, padding: '3px 10px',
          borderRadius: 10, textTransform: 'uppercase', letterSpacing: 0.5,
        }}>
          {product.badge}
        </span>
      )}

      {/* Wishlist button */}
      <button
        onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 1,
          background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
          width: 32, height: 32, borderRadius: '50%', fontSize: 15,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: wished ? '#e05c3a' : '#bbb',
        }}
      >
        {wished ? '❤️' : '🤍'}
      </button>

      {/* Product Image */}
      <div style={{
        height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)', fontSize: 64,
      }}>
        {product.image || product.emoji}
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>
          {product.category}
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.3 }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <StarRating rating={product.rating} size={12} />
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>({product.numReviews})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>${product.price}</span>
          <button
            onClick={handleAddToCart}
            style={{
              background: added ? '#52b788' : 'var(--accent)',
              color: '#fff', border: 'none', cursor: 'pointer',
              padding: '7px 14px', borderRadius: 16, fontSize: 12, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 4,
              transition: 'background 0.3s',
            }}
          >
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
