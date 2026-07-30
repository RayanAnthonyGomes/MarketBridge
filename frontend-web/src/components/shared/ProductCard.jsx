import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';
import StarRating from '../shared/StarRating';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.images[0]} alt={product.title} loading="lazy" />
        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        {product.aiRecommended && (
          <span className="ai-badge"><Sparkles size={12} /> AI Pick</span>
        )}
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <Heart size={18} fill={wishlisted ? 'var(--error)' : 'none'} stroke={wishlisted ? 'var(--error)' : 'currentColor'} />
        </button>
      </div>
      <div className="product-body">
        <span className="product-category">{product.category.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        <h3 className="product-title">{product.title}</h3>
        <StarRating rating={product.rating} count={product.reviewCount} size={14} />
        <div className="product-price-row">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="product-original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          className={`btn btn-sm add-to-cart-btn ${addedToCart ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={14} />
          {addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}
