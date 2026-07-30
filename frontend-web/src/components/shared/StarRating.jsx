import { Star } from 'lucide-react';

export default function StarRating({ rating, count, showCount = true, size = 16 }) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(<Star key={i} size={size} fill="var(--secondary)" stroke="var(--secondary)" />);
    } else if (i === full && hasHalf) {
      stars.push(
        <span key={i} style={{ position: 'relative', display: 'inline-flex', width: size, height: size }}>
          <Star size={size} stroke="var(--border)" fill="none" style={{ position: 'absolute' }} />
          <span style={{ overflow: 'hidden', width: '50%', position: 'absolute' }}>
            <Star size={size} fill="var(--secondary)" stroke="var(--secondary)" />
          </span>
        </span>
      );
    } else {
      stars.push(<Star key={i} size={size} stroke="var(--border)" fill="none" />);
    }
  }

  return (
    <div className="star-rating">
      {stars}
      {showCount && count !== undefined && (
        <span className="rating-text">({count})</span>
      )}
    </div>
  );
}
