import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#2d1f1a', color: '#f8e8d8', padding: '48px 0 24px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🌸</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: '#c97b63' }}>GlowCo</span>
            </div>
            <p style={{ color: '#c4a899', fontSize: 13, lineHeight: 1.7 }}>
              Science-backed skincare for every skin type. Clean, effective, and sustainable since 2022.
            </p>
          </div>

          {[
            { title: 'Shop',  links: [['/shop', 'All Products'], ['/shop?cat=Cleanser', 'Cleansers'], ['/shop?cat=Moisturizer', 'Moisturizers'], ['/shop?cat=Serum', 'Serums']] },
            { title: 'Learn', links: [['/blog', 'Blog'], ['/quiz', 'Skin Quiz'], ['/routine', 'Routine Builder'], ['/about', 'Our Story']] },
            { title: 'Help',  links: [['/contact', 'Contact Us'], ['/orders', 'Order Tracking'], ['/contact', 'Returns & FAQ']] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#c97b63', marginBottom: 12 }}>
                {col.title}
              </div>
              {col.links.map(([to, label]) => (
                <Link key={label} to={to} style={{ display: 'block', color: '#c4a899', fontSize: 13, marginBottom: 6, textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ color: '#c4a899', fontSize: 12 }}>© {year} GlowCo. All rights reserved.</span>
          <span style={{ color: '#c4a899', fontSize: 12 }}>Clean Beauty · Cruelty Free · Sustainable Packaging 🌱</span>
        </div>
      </div>
    </footer>
  );
}
