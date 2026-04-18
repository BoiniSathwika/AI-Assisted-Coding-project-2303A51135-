import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { dark, toggleDark } = useTheme();
  const { user, logout } = useAuth();
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [userMenuOpen, setUserOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setUserOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/',        label: 'Home'  },
    { to: '/shop',    label: 'Shop'  },
    { to: '/blog',    label: 'Blog'  },
    { to: '/about',   label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      background: 'var(--card)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 200,
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>🌸</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--accent)' }}>
            GlowCo
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 2, flex: 1, justifyContent: 'center' }}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 500,
              textDecoration: 'none',
              color: isActive(to) ? 'var(--accent)' : 'var(--text)',
              background: isActive(to) ? 'var(--accent-light)' : 'transparent',
              transition: 'all 0.2s',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Dark mode toggle */}
          <button onClick={toggleDark} title="Toggle theme" style={{
            background: 'none', border: 'none', fontSize: 18, padding: 8,
            color: 'var(--text)', borderRadius: '50%', lineHeight: 1,
          }}>
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" style={{ position: 'relative', padding: 8, fontSize: 18, lineHeight: 1, textDecoration: 'none' }}>
            🤍
            {wishlist.length > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" style={{ position: 'relative', padding: 8, fontSize: 18, lineHeight: 1, textDecoration: 'none' }}>
            🛒
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, background: 'var(--accent)', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* User menu */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserOpen(!userMenuOpen)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--accent-light)', border: 'none', cursor: 'pointer',
                padding: '6px 12px', borderRadius: 20,
              }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>
                  {user.name[0]}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{user.name.split(' ')[0]}</span>
              </button>

              {userMenuOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: 8, minWidth: 164,
                  boxShadow: 'var(--shadow)', zIndex: 300,
                }}>
                  {[
                    ['/profile',  'My Profile'],
                    ['/orders',   'Orders'],
                    ['/quiz',     'Skin Quiz'],
                    ['/routine',  'My Routine'],
                  ].map(([to, label]) => (
                    <Link key={to} to={to} onClick={() => setUserOpen(false)} style={{
                      display: 'block', padding: '8px 12px',
                      color: 'var(--text)', textDecoration: 'none',
                      fontSize: 13, borderRadius: 8,
                    }}>
                      {label}
                    </Link>
                  ))}
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setUserOpen(false)} style={{
                      display: 'block', padding: '8px 12px', color: 'var(--accent)',
                      textDecoration: 'none', fontSize: 13, fontWeight: 700, borderRadius: 8,
                    }}>
                      ⚙️ Admin Panel
                    </Link>
                  )}
                  <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
                  <button onClick={handleLogout} style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '8px 12px', background: 'none', border: 'none',
                    cursor: 'pointer', color: '#e05c3a', fontSize: 13, borderRadius: 8,
                  }}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={{
              background: 'var(--accent)', color: '#fff', textDecoration: 'none',
              padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600,
            }}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
