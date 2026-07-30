import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Minus, Plus, ChevronRight, Sparkles, Store, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import StarRating from '../../components/shared/StarRating';
import ProductCard from '../../components/shared/ProductCard';
import { products } from '../../data/products';
import { reviews } from '../../data/mock';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary btn-md mt-5">Back to Products</Link>
      </div>
    );
  }

  const productReviews = reviews.filter(r => r.productId === id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pdp page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products">Products</Link>
          <ChevronRight size={14} />
          <Link to={`/products?category=${product.category}`}>{product.category.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}</Link>
          <ChevronRight size={14} />
          <span>{product.title}</span>
        </nav>

        <div className="pdp-grid">
          {/* Images */}
          <div className="pdp-images">
            <div className="pdp-main-image">
              <img src={product.images[selectedImage]} alt={product.title} />
              {discount > 0 && <span className="discount-badge-lg">-{discount}%</span>}
              {product.aiRecommended && (
                <span className="ai-badge-lg"><Sparkles size={14} /> AI Recommended</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="pdp-thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`pdp-thumb ${i === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt={`${product.title} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pdp-info">
            <span className="overline text-muted">{product.category.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            <h1 className="pdp-title">{product.title}</h1>

            <div className="pdp-rating-row">
              <StarRating rating={product.rating} count={product.reviewCount} size={18} />
            </div>

            <div className="pdp-price-block">
              <span className="pdp-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="pdp-original-price">${product.originalPrice.toFixed(2)}</span>
                  <span className="badge badge-success">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </>
              )}
            </div>

            <p className="pdp-description">{product.description}</p>

            {/* Specs */}
            <div className="pdp-specs">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="pdp-spec">
                  <span className="spec-key">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pdp-actions">
              <div className="quantity-control">
                <button className="btn-icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="btn-icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button className={`btn btn-lg pdp-add-btn ${addedToCart ? 'added' : ''}`} onClick={handleAddToCart}>
                <ShoppingCart size={18} />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button className={`btn-icon pdp-wishlist ${wishlisted ? 'active' : ''}`} onClick={() => setWishlisted(!wishlisted)}>
                <Heart size={20} fill={wishlisted ? 'var(--error)' : 'none'} stroke={wishlisted ? 'var(--error)' : 'currentColor'} />
              </button>
            </div>

            {/* Stock */}
            <p className={`pdp-stock ${product.stock < 20 ? 'low' : ''}`}>
              {product.stock < 20 ? `⚠️ Only ${product.stock} left in stock!` : `✅ In stock (${product.stock} available)`}
            </p>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge"><Truck size={16} /> Free shipping over $50</div>
              <div className="trust-badge"><ShieldCheck size={16} /> Secure checkout</div>
              <div className="trust-badge"><RotateCcw size={16} /> 30-day returns</div>
            </div>

            {/* Seller */}
            <div className="pdp-seller">
              <Store size={16} />
              <span>Sold by <strong>{product.seller.name}</strong></span>
              <StarRating rating={product.seller.rating} showCount={false} size={12} />
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="pdp-reviews">
          <h2 className="h2 mb-5">Customer Reviews ({productReviews.length})</h2>
          {productReviews.length === 0 ? (
            <p className="text-secondary">No reviews yet for this product.</p>
          ) : (
            <div className="reviews-list">
              {productReviews.map(review => (
                <div key={review.id} className="review-card card-flat">
                  <div className="review-header">
                    <div className="review-user">
                      <div className="user-avatar" style={{ width: 36, height: 36, fontSize: '0.7rem' }}>
                        {review.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold body-sm">{review.userName}</p>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} showCount={false} size={12} />
                          {review.verified && <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>Verified Purchase</span>}
                        </div>
                      </div>
                    </div>
                    <span className="caption text-muted">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <h4 className="review-title">{review.title}</h4>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="pdp-related">
            <h2 className="h2 mb-5">
              <Sparkles size={20} className="text-info" style={{ display: 'inline', marginRight: 8 }} />
              You May Also Like
            </h2>
            <div className="product-grid">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
