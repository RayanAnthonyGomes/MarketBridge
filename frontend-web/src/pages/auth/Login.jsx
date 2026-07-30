import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));

    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(`/dashboard/${result.user.role}`);
    } else {
      setError(result.error);
    }
  };

  const quickLogin = (role) => {
    const creds = {
      buyer: { email: 'buyer@marketbridge.com', password: 'buyer123' },
      seller: { email: 'seller@marketbridge.com', password: 'seller123' },
      admin: { email: 'admin@marketbridge.com', password: 'admin123' },
    };
    setEmail(creds[role].email);
    setPassword(creds[role].password);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-hero">
          <div className="login-hero-content">
            <div className="login-brand">
              <div className="brand-icon" style={{ width: 48, height: 48, fontSize: 24 }}>M</div>
              <h1>MarketBridge</h1>
            </div>
            <p className="login-hero-text">
              AI-Powered Digital Marketplace connecting sellers directly with consumers.
            </p>
            <div className="login-features">
              <div className="login-feature">
                <span className="feature-icon">✨</span>
                <div>
                  <h4>Smart Recommendations</h4>
                  <p>AI-powered product suggestions tailored to you</p>
                </div>
              </div>
              <div className="login-feature">
                <span className="feature-icon">📊</span>
                <div>
                  <h4>Dynamic Pricing</h4>
                  <p>Real-time pricing intelligence for sellers</p>
                </div>
              </div>
              <div className="login-feature">
                <span className="feature-icon">🛡️</span>
                <div>
                  <h4>Fraud Protection</h4>
                  <p>Advanced anomaly detection keeps you safe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="login-form-side">
          <div className="login-form-container">
            <h2>Welcome back</h2>
            <p className="text-secondary">Sign in to your account to continue</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label className="input-label">Email</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    className={`input ${error ? 'error' : ''}`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`input ${error ? 'error' : ''}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <p className="input-error" style={{ marginBottom: 'var(--space-3)' }}>{error}</p>}

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">Signing in...</span>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="quick-login">
              <p className="overline text-muted" style={{ marginBottom: 'var(--space-3)', textAlign: 'center' }}>Quick Login (Prototype)</p>
              <div className="quick-login-buttons">
                <button className="quick-btn buyer" onClick={() => quickLogin('buyer')}>
                  🛒 Buyer
                </button>
                <button className="quick-btn seller" onClick={() => quickLogin('seller')}>
                  🏪 Seller
                </button>
                <button className="quick-btn admin" onClick={() => quickLogin('admin')}>
                  🛡️ Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
