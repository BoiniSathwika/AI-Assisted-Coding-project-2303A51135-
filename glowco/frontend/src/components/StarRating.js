// StarRating.js
import React from 'react';

export default function StarRating({ rating = 0, size = 14, interactive = false, onChange }) {
  const [hover, setHover] = React.useState(0);

  if (interactive) {
    return (
      <div style={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <span
            key={i}
            onClick={() => onChange && onChange(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            style={{
              fontSize: size + 2,
              color: i <= (hover || rating) ? '#f59e0b' : '#d1d5db',
              cursor: 'pointer', transition: 'color 0.15s',
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? '#f59e0b' : '#d1d5db', lineHeight: 1 }}>
          ★
        </span>
      ))}
    </div>
  );
}
