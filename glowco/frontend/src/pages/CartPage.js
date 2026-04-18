import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();

  const shipping = cartTotal >= 50 ? 0 : 5.99;
  const total    = cartTotal + shipping;

  if (cart.length === 0) return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
      <h2 style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Your cart is empty</h2>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Add some skincare goodness to get started!</p>
      <Link to="/shop" style={{ background: 'var(--accent)', color: '#fff', textDecoration: 'none', padding: '12px 28px', borderRadius: 24, fontWeight: 600 }}>
        Continue Shopping
      </Link>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--text)', fontWeight: 400, marginBottom: 32 }}>
          Your Cart ({cart.reduce((a, i) => a + i.qty, 0)} items)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cart.map(item => (
              <div key={item._id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 72, height: 72, background: 'var(--bg)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0 }}>
                  {item.image}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>{item.category}</div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 15, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 16 }}>
                  <button onClick={() => updateQty(item._id, item.qty - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', color: 'var(--text)', fontSize: 16 }}>−</button>
                  <span style={{ padding: '6px 8px', fontSize: 14, color: 'var(--text)', minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', color: 'var(--text)', fontSize: 16 }}>+</button>
                </div>
                <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 8, fontSize: 16 }}>🗑</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, position: 'sticky', top: 80 }}>
            <h3 style={{ color: 'var(--text)', fontSize: 18, margin: '0 0 20px' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 14 }}>
                <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 14 }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#52b788' : 'var(--muted)', fontWeight: shipping === 0 ? 600 : 400 }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: 11, color: 'var(--muted)', background: 'rgba(82,183,136,0.08)', padding: '8px 10px', borderRadius: 6, margin: 0 }}>
                  Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--text)', fontSize: 18, marginBottom: 20 }}>
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <button onClick={() => navigate('/checkout')} style={{ width: '100%', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '14px', borderRadius: 24, fontWeight: 600, fontSize: 15 }}>
              Proceed to Checkout
            </button>
            <Link to="/shop" style={{ display: 'block', textAlign: 'center', color: 'var(--muted)', fontSize: 13, marginTop: 10, textDecoration: 'none' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
