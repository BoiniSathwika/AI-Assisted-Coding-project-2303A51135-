import React, { useState } from 'react';
import { BLOG_POSTS } from '../utils/data';

/* ─── Blog ─────────────────────────────────────────────────────── */
export function BlogPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: 960 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, color: 'var(--text)', fontWeight: 400, marginBottom: 6 }}>Skincare Journal</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 40, fontSize: 16 }}>Science-backed tips for your best skin</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
          {BLOG_POSTS.map(post => (
            <div key={post.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ height: 150, background: 'linear-gradient(135deg, var(--accent-light), var(--bg))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60 }}>
                {post.emoji}
              </div>
              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <span style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '2px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700 }}>{post.category}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 11 }}>{post.readTime} read</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.3 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 14px' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 12 }}>{post.date}</span>
                  <span style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>Read more →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── About ────────────────────────────────────────────────────── */
export function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <section style={{ background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--bg) 100%)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 48, color: 'var(--text)', fontWeight: 400, marginBottom: 16 }}>Our Story</h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            GlowCo was born from the belief that everyone deserves skincare that actually works — without the confusion, the overwhelm, or the harsh chemicals.
          </p>
        </div>
      </section>

      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 56 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 30, color: 'var(--text)', fontWeight: 400, marginBottom: 16 }}>Clean formulas, real results</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 12 }}>We partner with dermatologists and cosmetic chemists to formulate products that deliver visible results while respecting your skin's natural barrier.</p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>No parabens, no sulfates, no synthetic fragrances — just science-backed actives in efficacious concentrations.</p>
          </div>
          <div style={{ background: 'var(--bg-2)', borderRadius: 20, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, border: '1px solid var(--border)' }}>
            🌱
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[['🌿', 'Clean Ingredients', 'No harmful chemicals, ever'], ['🔬', 'Science-Backed', 'Dermatologist formulated'], ['♻️', 'Sustainable', 'Eco-friendly packaging'], ['💖', 'Inclusive', 'For all skin types']].map(([emoji, title, desc]) => (
            <div key={title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{emoji}</div>
              <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14, marginBottom: 4 }}>{title}</div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Contact ──────────────────────────────────────────────────── */
export function ContactPage() {
  const [sent, setSent] = useState(false);
  const inp = { width: '100%', padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, color: 'var(--text)', fontWeight: 400, marginBottom: 6 }}>Get in Touch</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 40, fontSize: 16 }}>We'd love to hear from you. Our team responds within 24 hours.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[['📧', 'Email',   'hello@glowco.com'], ['💬', 'Support', 'support@glowco.com'], ['⏰', 'Hours',   'Mon–Fri, 9AM–6PM']].map(([emoji, label, val]) => (
              <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{emoji}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 2 }}>{val}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <h3 style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Message sent!</h3>
                <p style={{ color: 'var(--muted)' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div><label style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>Name</label><input placeholder="Your name" style={{ ...inp, marginTop: 6 }} /></div>
                  <div><label style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>Email</label><input placeholder="you@email.com" style={{ ...inp, marginTop: 6 }} /></div>
                </div>
                <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>Subject</label><input placeholder="How can we help?" style={{ ...inp, marginTop: 6 }} /></div>
                <div style={{ marginBottom: 20 }}><label style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>Message</label><textarea rows={4} placeholder="Tell us more..." style={{ ...inp, marginTop: 6, resize: 'vertical' }} /></div>
                <button onClick={() => setSent(true)} style={{ width: '100%', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '13px', borderRadius: 24, fontWeight: 600, fontSize: 14 }}>
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
