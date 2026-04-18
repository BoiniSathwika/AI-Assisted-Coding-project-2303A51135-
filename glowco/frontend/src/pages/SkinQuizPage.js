import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../utils/data';

const QUESTIONS = [
  { id: 'feel', q: 'How does your skin feel by midday?', opts: [
    { label: 'Tight and dry',         val: 'dry'       },
    { label: 'Shiny all over',        val: 'oily'      },
    { label: 'Shiny T-zone only',     val: 'combination'},
    { label: 'Irritated or reactive', val: 'sensitive' },
  ]},
  { id: 'pores', q: 'How visible are your pores?', opts: [
    { label: 'Barely visible',                  val: 'dry'        },
    { label: 'Quite large and visible',         val: 'oily'       },
    { label: 'Large on nose and forehead',      val: 'combination'},
    { label: 'Small but skin reacts easily',    val: 'sensitive'  },
  ]},
  { id: 'concern', q: 'What\'s your #1 skin concern?', opts: [
    { label: 'Dryness and flaking',    val: 'dry'        },
    { label: 'Shine and breakouts',    val: 'oily'       },
    { label: 'Uneven texture',         val: 'combination'},
    { label: 'Redness and irritation', val: 'sensitive'  },
  ]},
  { id: 'reaction', q: 'How does your skin react to new products?', opts: [
    { label: 'Often feels dry or tight',           val: 'dry'        },
    { label: 'Breaks out more',                    val: 'oily'       },
    { label: 'Sometimes breaks out in spots',      val: 'combination'},
    { label: 'Turns red, burns, or stings often',  val: 'sensitive'  },
  ]},
];

const SKIN_INFO = {
  dry:         { emoji: '🌵', title: 'Dry Skin',         color: '#e8f0ff', tips: ['Use a gentle hydrating cleanser', 'Apply moisturizer to damp skin', 'Layer hydrating serums', 'Use a humidifier at night'] },
  oily:        { emoji: '✨', title: 'Oily Skin',        color: '#f0fff4', tips: ['Use a BHA exfoliant 2-3×/week', 'Choose oil-free moisturizers', "Don't skip moisturizer!", 'Add niacinamide to your routine'] },
  combination: { emoji: '⚖️', title: 'Combination Skin', color: '#fff8e8', tips: ['Spot-treat oily zones', 'Use lightweight moisturizers', 'Apply BHA only on oily areas', 'Hydrate dry patches with richer creams'] },
  sensitive:   { emoji: '🌸', title: 'Sensitive Skin',   color: '#fdeee8', tips: ['Patch test every new product', 'Avoid fragrance and alcohol', 'Use minimal ingredients', 'Fragrance-free SPF is a must'] },
};

export default function SkinQuizPage() {
  const { updateUser } = useAuth();
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult]   = useState(null);

  const getSkinType = (ans) => {
    const counts = { dry: 0, oily: 0, combination: 0, sensitive: 0 };
    Object.values(ans).forEach(v => counts[v]++);
    return Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b);
  };

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: val };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const skinType = getSkinType(newAnswers);
      setResult(skinType);
      updateUser?.({ skinType });
    }
  };

  if (result) {
    const info = SKIN_INFO[result];
    const recs = PRODUCTS.filter(p => p.skinTypes.includes(result) || p.skinTypes.includes('all')).slice(0, 4);
    return (
      <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{info.emoji}</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--text)', fontWeight: 400, marginBottom: 10 }}>
            You have {info.title}!
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Here's what works best for your skin type, curated just for you.
          </p>

          {/* Tips */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 36, textAlign: 'left' }}>
            <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: 16 }}>Tips for your skin type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              {info.tips.map(tip => (
                <div key={tip} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#52b788', flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--text)', fontWeight: 400, marginBottom: 24, textAlign: 'left' }}>Recommended for you</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, textAlign: 'left', marginBottom: 32 }}>
            {recs.map(p => <ProductCard key={p._id} product={p} />)}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" style={{ background: 'var(--accent)', color: '#fff', textDecoration: 'none', padding: '12px 28px', borderRadius: 24, fontWeight: 600 }}>
              Shop My Picks
            </Link>
            <Link to="/routine" style={{ background: 'transparent', color: 'var(--accent)', border: '2px solid var(--accent)', textDecoration: 'none', padding: '12px 28px', borderRadius: 24, fontWeight: 600 }}>
              Build My Routine
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: 560, width: '100%', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 2 }}>
            Skin Quiz · {step + 1} of {QUESTIONS.length}
          </span>
          {/* Progress */}
          <div style={{ width: '100%', height: 4, background: 'var(--border)', borderRadius: 2, margin: '12px 0 0' }}>
            <div style={{ height: '100%', width: `${(step / QUESTIONS.length) * 100}%`, background: 'var(--accent)', borderRadius: 2, transition: 'width 0.3s' }} />
          </div>
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--text)', fontWeight: 400, textAlign: 'center', marginBottom: 28, lineHeight: 1.4 }}>
          {q.q}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.opts.map(opt => (
            <button
              key={opt.val}
              onClick={() => handleAnswer(opt.val)}
              style={{ background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 18px', cursor: 'pointer', textAlign: 'left', fontSize: 15, color: 'var(--text)', fontWeight: 500, transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-light)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)'; }}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', marginTop: 20, fontSize: 13 }}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
