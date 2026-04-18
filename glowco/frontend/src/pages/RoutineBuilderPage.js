import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ROUTINES = {
  morning: [
    { n: 1, step: 'Cleanse',    product: 'Gentle Foam Cleanser',        tip: 'Lukewarm water only — hot water strips oils',      emoji: '🧴', color: '#fff5f0' },
    { n: 2, step: 'Tone',       product: 'BHA Exfoliant Toner',          tip: '2–3× per week, skip on retinol nights',            emoji: '💧', color: '#e8f4ff' },
    { n: 3, step: 'Serum',      product: 'Vitamin C Brightening Serum',  tip: 'Apply on slightly damp skin for better absorption', emoji: '✨', color: '#fff8e8' },
    { n: 4, step: 'Eye Cream',  product: 'Peptide Eye Cream',            tip: 'Tap gently with ring finger, never rub',           emoji: '👁️', color: '#f0f4ff' },
    { n: 5, step: 'Moisturize', product: 'Hydra-Boost Moisturizer',     tip: 'Apply while skin is still slightly damp',          emoji: '🫧', color: '#e8fff4' },
    { n: 6, step: 'SPF',        product: 'SPF 50+ Invisible Sunscreen',  tip: 'Always the final AM step. Reapply every 2 hours',  emoji: '☀️', color: '#fff4e8' },
  ],
  evening: [
    { n: 1, step: 'Oil Cleanse', product: 'Cleansing Balm / Oil',        tip: 'Dissolves SPF and makeup thoroughly',              emoji: '🌿', color: '#f8f0ff' },
    { n: 2, step: 'Foam Cleanse',product: 'Gentle Foam Cleanser',        tip: 'Second cleanse removes residue from oil step',     emoji: '🧴', color: '#fff5f0' },
    { n: 3, step: 'Exfoliate',  product: 'BHA Exfoliant Toner',          tip: 'Max 3× per week. Skip on retinol nights',         emoji: '💧', color: '#e8f4ff' },
    { n: 4, step: 'Treatment',  product: 'Retinol Night Serum',          tip: 'Start 2× per week, build up to nightly slowly',   emoji: '🌙', color: '#f0e8ff' },
    { n: 5, step: 'Eye Cream',  product: 'Peptide Eye Cream',            tip: 'The eye area absorbs well overnight',              emoji: '👁️', color: '#f0f4ff' },
    { n: 6, step: 'Moisturize', product: 'Barrier Repair Cream',        tip: 'Richer cream overnight = maximum repair',          emoji: '🛡️', color: '#e8fff4' },
  ],
};

export default function RoutineBuilderPage() {
  const { user } = useAuth();
  const [time, setTime] = useState('morning');
  const routine = ROUTINES[time];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '80vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: 680 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--text)', fontWeight: 400, marginBottom: 6 }}>
          Routine Builder
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: 28 }}>
          {user?.skinType ? `Personalized for ${user.skinType} skin` : 'Build your perfect skincare routine'}
        </p>

        {/* Toggle */}
        <div style={{ display: 'inline-flex', background: 'var(--bg-2)', borderRadius: 24, padding: 4, marginBottom: 32, border: '1px solid var(--border)' }}>
          {['morning', 'evening'].map(t => (
            <button key={t} onClick={() => setTime(t)} style={{
              padding: '8px 24px', borderRadius: 20,
              background: time === t ? 'var(--accent)' : 'transparent',
              color: time === t ? '#fff' : 'var(--muted)',
              border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, textTransform: 'capitalize',
            }}>
              {t === 'morning' ? '🌅' : '🌙'} {t}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {routine.map(s => (
            <div key={s.n} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {s.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Step {s.n}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{s.step}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 3 }}>{s.product}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 4 }}>
                  <span style={{ color: '#f4a261' }}>💡</span> {s.tip}
                </div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>
                {String(s.n).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--accent-light)', borderRadius: 'var(--radius)', padding: 16 }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--text)' }}>Pro tip:</strong> Stick to this routine for at least 4–6 weeks before evaluating results. Consistency is the real "secret ingredient." Always patch test new products before adding them.
          </p>
        </div>
      </div>
    </div>
  );
}
