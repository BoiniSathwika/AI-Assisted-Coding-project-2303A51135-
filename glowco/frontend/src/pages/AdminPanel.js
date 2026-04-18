import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import PRODUCTS from '../utils/data';

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab]           = useState('overview');
  const [products, setProducts] = useState(PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEdit]  = useState(null);

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <div style={{ fontSize: 48 }}>🔒</div>
        <p style={{ color: 'var(--muted)' }}>Admin access required.</p>
        <button onClick={() => navigate('/login')} style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '10px 24px', borderRadius: 20, fontWeight: 600 }}>Sign In</button>
      </div>
    );
  }

  const stats = [
    { label: 'Total Products', value: products.length,   emoji: '📦' },
    { label: 'Total Orders',   value: 48,                emoji: '🛒' },
    { label: 'Active Users',   value: '1,284',           emoji: '👥' },
    { label: 'Monthly Revenue',value: '$12,480',          emoji: '💰' },
  ];

  const sampleOrders = [
    { id: 'GC-84923', user: 'Priya M.',  items: 'Vit C Serum, SPF',   total: 81,  status: 'Delivered' },
    { id: 'GC-73841', user: 'Sarah K.',  items: 'Moisturizer',         total: 38,  status: 'Shipped'   },
    { id: 'GC-62730', user: 'Aisha R.',  items: 'Retinol, Eye Cream',  total: 116, status: 'Processing'},
    { id: 'GC-51619', user: 'Maya T.',   items: 'Foam Cleanser',       total: 24,  status: 'Delivered' },
  ];

  const sampleUsers = [
    { name: 'Admin User', email: 'admin@glowco.com', skinType: 'combination', role: 'admin',    joined: 'Jan 2026' },
    { name: 'Priya Mehta', email: 'priya@example.com', skinType: 'oily',       role: 'customer', joined: 'Feb 2026' },
    { name: 'Sarah Kim',   email: 'sarah@example.com', skinType: 'sensitive',  role: 'customer', joined: 'Mar 2026' },
    { name: 'Aisha Rahman',email: 'aisha@example.com', skinType: 'dry',        role: 'customer', joined: 'Mar 2026' },
  ];

  const statusColor = { Delivered: '#52b788', Shipped: '#f4a261', Processing: 'var(--accent)' };

  const tabs = ['overview', 'products', 'orders', 'users'];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Admin Sub-Navbar */}
      <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '0 24px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 52, gap: 0 }}>
          <span style={{ fontWeight: 700, color: 'var(--accent)', marginRight: 24, fontSize: 13 }}>⚙️ Admin Panel</span>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0 16px', height: '100%', background: 'none',
              border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
              color: tab === t ? 'var(--accent)' : 'var(--muted)',
              textTransform: 'capitalize', marginBottom: -1,
            }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>

        {/* Overview */}
        {tab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 32 }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 16px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)' }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
              <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: 16 }}>Recent Orders</h3>
              {sampleOrders.slice(0, 3).map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text)', fontSize: 13, fontWeight: 600 }}>#{o.id}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 13 }}>{o.user}</span>
                  <span style={{ color: 'var(--text)', fontSize: 13, fontWeight: 700 }}>${o.total}</span>
                  <span style={{ background: statusColor[o.status] + '22', color: statusColor[o.status], padding: '2px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>{o.status}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Products */}
        {tab === 'products' && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ color: 'var(--text)', margin: 0 }}>Products ({products.length})</h3>
              <button onClick={() => { setEdit(null); setShowForm(true); }} style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 16, fontSize: 13, fontWeight: 600 }}>
                + Add Product
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg)' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 22 }}>{p.image}</span>
                          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{p.category}</td>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: 'var(--text)', fontWeight: 600 }}>${p.price}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: p.stock < 20 ? '#e05c3a' : 'var(--muted)' }}>{p.stock}</td>
                      <td style={{ padding: '12px 16px' }}><StarRating rating={p.rating} size={13} /></td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => { setEdit(p); setShowForm(true); }} style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '4px 10px', borderRadius: 6, color: 'var(--muted)', fontSize: 12 }}>Edit</button>
                          <button onClick={() => setProducts(products.filter(x => x._id !== p._id))} style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '4px 10px', borderRadius: 6, color: '#e05c3a', fontSize: 12 }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === 'orders' && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
            <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: 16 }}>All Orders</h3>
            {sampleOrders.map(o => (
              <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px 110px', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>#{o.id}</span>
                <span style={{ color: 'var(--text)', fontSize: 13 }}>{o.user}</span>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>{o.items}</span>
                <span style={{ fontWeight: 700, color: 'var(--text)' }}>${o.total}</span>
                <span style={{ background: statusColor[o.status] + '22', color: statusColor[o.status], padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, textAlign: 'center' }}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Users */}
        {tab === 'users' && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
            <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: 16 }}>Users ({sampleUsers.length})</h3>
            {sampleUsers.map(u => (
              <div key={u.email} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
                  {u.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{u.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 12 }}>{u.email}</div>
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'capitalize' }}>{u.skinType} skin</span>
                <span style={{ background: u.role === 'admin' ? 'var(--accent-light)' : 'var(--bg)', color: u.role === 'admin' ? 'var(--accent)' : 'var(--muted)', padding: '2px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                  {u.role}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>{u.joined}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
