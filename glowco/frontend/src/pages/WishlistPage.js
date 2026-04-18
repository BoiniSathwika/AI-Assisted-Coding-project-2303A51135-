import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

/* ─── Wishlist ─────────────────────────────────────────────────── */
export function WishlistPage() {
  const { wishlist } = useCart();
  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--text)', fontWeight: 400, marginBottom: 6 }}>My Wishlist</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>{wishlist.length} items saved</p>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>❤️</div>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>No saved items yet. Browse products and heart your favourites!</p>
            <Link to="/shop" style={{ background: 'var(--accent)', color: '#fff', textDecoration: 'none', padding: '11px 24px', borderRadius: 24, fontWeight: 600 }}>Browse Products</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {wishlist.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Profile ──────────────────────────────────────────────────── */
export function ProfilePage() {
  const { user, logout } = useAuth();
  if (!user) return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Please sign in to view your profile.</p>
      <Link to="/login" style={{ background: 'var(--accent)', color: '#fff', textDecoration: 'none', padding: '10px 24px', borderRadius: 20, fontWeight: 600 }}>Sign In</Link>
    </div>
  );

  const quickLinks = [
    ['/quiz',    '🧬', 'Skin Quiz',    'Discover your skin type'],
    ['/routine', '🌅', 'My Routine',   'Morning & evening steps'],
    ['/orders',  '📦', 'Orders',       'Track your purchases'],
    ['/wishlist','❤️', 'Wishlist',     'Saved products'],
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        {/* Header card */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff' }}>
              {user.name[0]}
            </div>
            <div>
              <h2 style={{ fontSize: 22, color: 'var(--text)', margin: '0 0 4px', fontWeight: 600 }}>{user.name}</h2>
              <p style={{ color: 'var(--muted)', margin: '0 0 6px', fontSize: 14 }}>{user.email}</p>
              {user.skinType && (
                <span style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '3px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
                  {user.skinType} skin
                </span>
              )}
            </div>
            {user.role === 'admin' && (
              <span style={{ marginLeft: 'auto', background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700 }}>ADMIN</span>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
          {quickLinks.map(([to, emoji, label, desc]) => (
            <Link key={to} to={to} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 16px', textAlign: 'center', textDecoration: 'none', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{desc}</div>
            </Link>
          ))}
        </div>

        <button onClick={logout} style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '10px 24px', borderRadius: 20, color: '#e05c3a', fontWeight: 600, fontSize: 13 }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

/* ─── Orders ───────────────────────────────────────────────────── */
export function OrdersPage() {
  const sampleOrders = [
    { id: 'GC-84923', date: 'Mar 28, 2026', status: 'Delivered', items: ['Vitamin C Serum', 'SPF 50+'],           total: 81 },
    { id: 'GC-73841', date: 'Mar 12, 2026', status: 'Shipped',   items: ['Hydra-Boost Moisturizer'],              total: 38 },
    { id: 'GC-62730', date: 'Feb 20, 2026', status: 'Delivered', items: ['Gentle Foam Cleanser', 'Eye Cream'],    total: 72 },
  ];

  const statusColor = { Delivered: '#52b788', Shipped: '#f4a261', Processing: 'var(--accent)' };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--text)', fontWeight: 400, marginBottom: 28 }}>Order History</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sampleOrders.map(o => (
            <div key={o.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15 }}>#{o.id}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 3 }}>{o.date} · {o.items.join(', ')}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ background: statusColor[o.status] + '22', color: statusColor[o.status], padding: '3px 10px', borderRadius: 10, fontSize: 12, fontWeight: 700 }}>
                    {o.status}
                  </span>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16, marginTop: 4 }}>${o.total}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
