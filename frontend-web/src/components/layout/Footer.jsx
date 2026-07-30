import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="brand-icon">M</div>
              <span className="brand-text">MarketBridge</span>
            </div>
            <p className="footer-tagline">AI-Powered Digital Marketplace connecting sellers directly with consumers.</p>
          </div>
          <div className="footer-links-group">
            <h4>Marketplace</h4>
            <Link to="/products">All Products</Link>
            <Link to="/products?category=electronics">Electronics</Link>
            <Link to="/products?category=fashion">Fashion</Link>
            <Link to="/products?category=home-kitchen">Home & Kitchen</Link>
          </div>
          <div className="footer-links-group">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Press</a>
          </div>
          <div className="footer-links-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">Shipping Info</a>
            <a href="#">Returns</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 MarketBridge. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
