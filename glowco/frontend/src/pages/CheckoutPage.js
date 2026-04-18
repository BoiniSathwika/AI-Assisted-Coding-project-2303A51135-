import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    address: '', city: '', zip: '', country: 'India',
    cardNumber: '', expiry: '', cvv: '',
  });

  const shipping  = cartTotal >= 50 ? 0 : 5.99;
  const tax       = +(cartTotal * 0.05).toFixed(2);
  const total     = +(cartTotal + shipping + tax).toFixed(2);
  const orderId   = `GC-${Math.floor(Math.random() * 90000) + 10000}`;

  const inp = {
    width: '100%', padding: '11px 14px', border: '1px solid var(--border)',
    borderRadius: 8, background: 'transparent', color: 'var(--text)',
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
  };

  const field = (label, key, placeholder = '') => (
    <div>
      <label style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, display: 'block', marginBottom: 5 }}>{label}</label>
      <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} style={inp} />
    </div>
  );

  if (step === 3) return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#52b788', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#fff', marginBottom: 20 }}>✓</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--text)', fontWeight: 400, marginBottom: 12 }}>Order Confirmed! 🎉</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 4 }}>Order #{orderId} has been placed.</p>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 32 }}>A confirmation email has been sent to {form.email}</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => navigate('/')} style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '12px 28px', borderRadius: 24, fontWeight: 600 }}>
          Continue Shopping
        </button>
        <Link to="/orders" style={{ textDecoration: 'none', background: 'transparent', color: 'var(--accent)', border: '2px solid var(--accent)', padding: '12px 28px', borderRadius: 24, fontWeight: 600 }}>
          View Orders
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--text)', fontWeight: 400, marginBottom: 28 }}>Checkout</h1>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          {['Shipping', 'Payment'].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > i + 1 ? '#52b788' : step === i + 1 ? 'var(--accent)' : 'var(--border)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 13, color: step === i + 1 ? 'var(--text)' : 'var(--muted)', fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
              </div>
              {i < 1 && <div style={{ flex: 1, height: 1, background: 'var(--border)', margin: '0 12px' }} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 24, alignItems: 'start' }}>
          {/* Form */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
            {step === 1 && (
              <>
                <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: 20 }}>Shipping Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ gridColumn: '1/-1' }}>{field('Full Name', 'name')}</div>
                  <div style={{ gridColumn: '1/-1' }}>{field('Email', 'email')}</div>
                  <div style={{ gridColumn: '1/-1' }}>{field('Address', 'address', '123 Main St')}</div>
                  {field('City', 'city')}
                  {field('ZIP Code', 'zip')}
                </div>
                <button onClick={() => setStep(2)} style={{ width: '100%', marginTop: 20, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '13px', borderRadius: 24, fontWeight: 600 }}>
                  Continue to Payment
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: 12 }}>Payment Details</h3>
                <div style={{ background: 'rgba(82,183,136,0.08)', border: '1px solid rgba(82,183,136,0.25)', borderRadius: 8, padding: '9px 13px', marginBottom: 16, fontSize: 12, color: '#52b788' }}>
                  ✓ Demo mode — no real payment is processed
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {field('Card Number', 'cardNumber', '4242 4242 4242 4242')}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {field('Expiry', 'expiry', 'MM/YY')}
                    {field('CVV', 'cvv', '123')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 0, background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer', padding: '13px 20px', borderRadius: 24, fontWeight: 600 }}>
                    Back
                  </button>
                  <button onClick={() => { clearCart(); setStep(3); }} style={{ flex: 1, background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '13px', borderRadius: 24, fontWeight: 600 }}>
                    Place Order — ${total}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Summary */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 18 }}>
            <h4 style={{ color: 'var(--text)', margin: '0 0 14px', fontSize: 14 }}>Order Summary</h4>
            {cart.map(item => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>
                <span>{item.name} ×{item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }} />
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Tax (5%)</span><span>${tax}</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>
              <span>Total</span><span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
