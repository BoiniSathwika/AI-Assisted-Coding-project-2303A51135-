import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import PRODUCTS, { TESTIMONIALS } from '../utils/data';

export default function HomePage() {
  const featured = PRODUCTS.filter(p => p.isFeatured);

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--bg) 60%, #f0eaff 100%)',
        padding: '80px 0', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(201,123,99,0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, right: -40, width: 350, height: 350, borderRadius: '50%', background: 'rgba(180,130,200,0.07)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <span style={{ display: 'inline-block', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '4px 16px', borderRadius: 20, marginBottom: 20, textTransform: 'uppercase' }}>
            Clean · Effective · Sustainable
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--text)', lineHeight: 1.15, marginBottom: 20, fontWeight: 400 }}>
            Skincare that <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>actually</em><br />works for you
          </h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            Science-backed formulas designed for real skin. Take our skin quiz and get a personalized routine crafted just for you.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" style={{ background: 'var(--accent)', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: 30, fontSize: 15, fontWeight: 600 }}>
              Shop Now →
            </Link>
            <Link to="/quiz" style={{ background: 'transparent', color: 'var(--accent)', border: '2px solid var(--accent)', textDecoration: 'none', padding: '14px 32px', borderRadius: 30, fontSize: 15, fontWeight: 600 }}>
              Take Skin Quiz
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 48, flexWrap: 'wrap' }}>
            {[['50K+', 'Happy Customers'], ['100%', 'Clean Ingredients'], ['4.8★', 'Average Rating']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section-sm">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 8, color: 'var(--text)' }}>Shop by Category</h2>
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: 32 }}>Find the perfect products for every step of your routine</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { name: 'Cleansers',     emoji: '🧴', cat: 'Cleanser',    bg: '#fff5f0' },
              { name: 'Moisturizers',  emoji: '🫧', cat: 'Moisturizer', bg: '#f0f4ff' },
              { name: 'Serums',        emoji: '✨', cat: 'Serum',       bg: '#f0fff4' },
              { name: 'Sunscreen',     emoji: '☀️', cat: 'Sunscreen',   bg: '#fffbf0' },
            ].map(cat => (
              <Link key={cat.name} to={`/shop?category=${cat.cat}`} style={{
                background: cat.bg, border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '24px 20px',
                textAlign: 'center', textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'block',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>{cat.emoji}</div>
                <div style={{ fontWeight: 600, color: 'var(--accent)', fontSize: 14 }}>{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section-sm">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <h2 style={{ color: 'var(--text)' }}>Bestsellers</h2>
              <p style={{ color: 'var(--muted)', marginTop: 4 }}>Our most-loved products</p>
            </div>
            <Link to="/shop" style={{ color: 'var(--muted)', fontSize: 13, textDecoration: 'none', border: '1px solid var(--border)', padding: '8px 20px', borderRadius: 20 }}>
              View All
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {featured.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Skin Quiz CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #f8e8f8 0%, #e8f0ff 100%)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🧬</div>
            <h2 style={{ color: 'var(--text)', marginBottom: 12 }}>Not sure where to start?</h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
              Take our 2-minute skin quiz and get AI-powered product recommendations tailored to your unique skin type and concerns.
            </p>
            <Link to="/quiz" style={{ background: 'var(--accent)', color: '#fff', textDecoration: 'none', padding: '14px 36px', borderRadius: 30, fontSize: 15, fontWeight: 600 }}>
              Find My Routine
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 36, color: 'var(--text)' }}>What our customers say</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
                <StarRating rating={t.rating} />
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, margin: '12px 0' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 12 }}>{t.skin}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section style={{ background: 'var(--accent-light)', padding: '50px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--text)', marginBottom: 8 }}>Join the Glow Community</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Skincare tips, ingredient education, and exclusive offers — in your inbox.</p>
          <div style={{ display: 'flex', gap: 8, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input placeholder="your@email.com" style={{ flex: 1, padding: '12px 16px', borderRadius: 24, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)', fontSize: 14, minWidth: 200, outline: 'none' }} />
            <button style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '12px 24px', borderRadius: 24, fontWeight: 600, fontSize: 14 }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
