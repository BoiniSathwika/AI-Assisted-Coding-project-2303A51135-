import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../utils/data';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [skinType, setSkinType] = useState('All');
  const [sortBy, setSortBy]     = useState('popular');
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const categories = ['All', 'Cleanser', 'Moisturizer', 'Serum', 'Sunscreen'];
  const skinTypes  = ['All', 'dry', 'oily', 'combination', 'sensitive', 'normal'];

  const filtered = PRODUCTS
    .filter(p => category === 'All' || p.category === category)
    .filter(p => skinType === 'All' || p.skinTypes.includes(skinType) || p.skinTypes.includes('all'))
    .filter(p => p.price <= maxPrice)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low')  return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      return b.numReviews - a.numReviews;
    });

  return (
    <div style={{ padding: '40px 0', minHeight: '80vh', background: 'var(--bg)' }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--text)', fontWeight: 400, marginBottom: 6 }}>
          Shop All Products
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>{filtered.length} products found</p>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 32, alignItems: 'start' }}>
          {/* Sidebar Filters */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20, position: 'sticky', top: 80 }}>
            <h3 style={{ color: 'var(--text)', fontSize: 15, fontWeight: 600, marginBottom: 16, marginTop: 0 }}>Filters</h3>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 14 }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{ width: '100%', padding: '8px 10px 8px 30px', border: '1px solid var(--border)', borderRadius: 8, background: 'transparent', color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Category */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Category</div>
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '6px 10px', background: category === c ? 'var(--accent-light)' : 'transparent',
                  border: 'none', cursor: 'pointer', borderRadius: 6, fontSize: 13,
                  color: category === c ? 'var(--accent)' : 'var(--text)',
                  fontWeight: category === c ? 600 : 400, marginBottom: 2,
                }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Skin Type */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Skin Type</div>
              {skinTypes.map(s => (
                <button key={s} onClick={() => setSkinType(s)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '6px 10px', background: skinType === s ? 'var(--accent-light)' : 'transparent',
                  border: 'none', cursor: 'pointer', borderRadius: 6, fontSize: 13,
                  color: skinType === s ? 'var(--accent)' : 'var(--text)',
                  fontWeight: skinType === s ? 600 : 400, marginBottom: 2, textTransform: 'capitalize',
                }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Price */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                Max Price: ${maxPrice}
              </div>
              <input
                type="range" min="10" max="100" value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
            </div>
          </div>

          {/* Products */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
              <select
                value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--card)', color: 'var(--text)', fontSize: 13, cursor: 'pointer', outline: 'none' }}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <p>No products match your filters. Try adjusting them!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                {filtered.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
