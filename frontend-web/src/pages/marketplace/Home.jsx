import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import ProductCard from '../../components/shared/ProductCard';
import { products, categories } from '../../data/products';
import './Home.css';

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);
  const aiRecommended = products.filter(p => p.aiRecommended).slice(0, 4);

  return (
    <div className="home-page page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content container">
          <div className="hero-text">
            <span className="hero-badge">
              <Sparkles size={14} /> AI-Powered Marketplace
            </span>
            <h1 className="display-xl">
              Discover Products.<br />
              <span className="hero-gradient-text">Powered by Intelligence.</span>
            </h1>
            <p className="hero-description body-lg">
              MarketBridge connects you with the best sellers, smartest recommendations, 
              and fairest prices — all powered by cutting-edge AI.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-xl">
                Explore Products <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn btn-secondary btn-xl">
                Start Selling
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">12K+</span>
                <span className="hero-stat-label">Active Users</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">1.2K+</span>
                <span className="hero-stat-label">Products</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">98%</span>
                <span className="hero-stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card hero-card-1">
              <Sparkles size={20} />
              <div>
                <p className="font-semibold" style={{ fontSize: '0.85rem' }}>Smart Recommendations</p>
                <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Personalized to your taste</p>
              </div>
            </div>
            <div className="hero-card hero-card-2">
              <TrendingUp size={20} />
              <div>
                <p className="font-semibold" style={{ fontSize: '0.85rem' }}>Dynamic Pricing</p>
                <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Fair prices, always</p>
              </div>
            </div>
            <div className="hero-card hero-card-3">
              <Shield size={20} />
              <div>
                <p className="font-semibold" style={{ fontSize: '0.85rem' }}>Fraud Protection</p>
                <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Shop with confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section container">
        <div className="section-header">
          <h2 className="h2">Shop by Category</h2>
          <Link to="/products" className="section-link">View All <ChevronRight size={16} /></Link>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="category-card"
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.count} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section container">
        <div className="section-header">
          <h2 className="h2">Featured Products</h2>
          <Link to="/products" className="section-link">View All <ChevronRight size={16} /></Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="section ai-section">
        <div className="container">
          <div className="section-header">
            <div className="flex items-center gap-2">
              <Sparkles size={22} className="text-info" />
              <h2 className="h2">AI Recommended for You</h2>
            </div>
            <Link to="/products" className="section-link">View All <ChevronRight size={16} /></Link>
          </div>
          <div className="product-grid">
            {aiRecommended.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="section container">
        <div className="section-header">
          <div className="flex items-center gap-2">
            <TrendingUp size={22} className="text-warning" />
            <h2 className="h2">Trending Now</h2>
          </div>
          <Link to="/products" className="section-link">View All <ChevronRight size={16} /></Link>
        </div>
        <div className="product-grid">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section container">
        <div className="cta-banner">
          <div className="cta-content">
            <h2 className="display-lg" style={{ color: 'white' }}>Ready to Start Selling?</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: 480 }}>
              Join thousands of sellers on MarketBridge. Get AI-powered pricing insights and reach millions of buyers.
            </p>
            <Link to="/login" className="btn btn-xl" style={{ background: 'white', color: 'var(--primary-dark)', fontWeight: 600 }}>
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
