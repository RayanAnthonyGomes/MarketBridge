import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Mail, Lock, Eye, EyeOff, Sparkles, BarChart2, ShieldCheck } from 'lucide-react';
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
      buyer:  { email: 'buyer@marketbridge.com',  password: 'buyer123'  },
      seller: { email: 'seller@marketbridge.com', password: 'seller123' },
      admin:  { email: 'admin@marketbridge.com',  password: 'admin123'  },
    };
    setEmail(creds[role].email);
    setPassword(creds[role].password);
    setError('');
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Smart Recommendations',
      desc: 'AI-powered product suggestions tailored to your interests.',
      delay: 160,
    },
    {
      icon: BarChart2,
      title: 'Dynamic Pricing',
      desc: 'Real-time pricing intelligence for sellers to maximise revenue.',
      delay: 220,
    },
    {
      icon: ShieldCheck,
      title: 'Fraud Protection',
      desc: 'Advanced anomaly detection keeps every transaction safe.',
      delay: 280,
    },
  ];

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Hero side */}
        <div className="login-hero">
          <div className="login-hero-content">
            <div className="login-brand">
              <div className="brand-icon">M</div>
              <h1>MarketBridge</h1>
            </div>

            <p className="login-hero-text">
              An AI-powered marketplace connecting sellers directly with consumers — built for speed, trust, and scale.
            </p>

            <div className="login-features">
              {features.map(({ icon: Icon, title, desc, delay }, i) => (
                <div
                  key={title}
                  className="login-feature"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <div className="feature-icon-wrap">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="login-form-side">
          <div className="login-form-container">
            <h2>Welcome back</h2>
            <span className="text-secondary">Sign in to your account to continue</span>

            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <div className="input-group">
                <label className="input-label" htmlFor="login-email">Email</label>
                <div className="input-with-icon">
                  <Mail size={17} className="input-icon" />
                  <input
                    id="login-email"
                    type="email"
                    className={`input ${error ? 'error' : ''}`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="login-password">Password</label>
                <div className="input-with-icon">
                  <Lock size={17} className="input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`input ${error ? 'error' : ''}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="input-error" style={{ marginBottom: 'var(--space-3)' }}>{error}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                id="login-submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">Signing in…</span>
                ) : (
                  <>
                    <LogIn size={17} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="quick-login">
              <p className="overline text-muted" style={{ textAlign: 'center' }}>
                Quick Access — Prototype
              </p>
              <div className="quick-login-buttons">
                <button id="quick-buyer"  className="quick-btn buyer"  onClick={() => quickLogin('buyer')}>Buyer</button>
                <button id="quick-seller" className="quick-btn seller" onClick={() => quickLogin('seller')}>Seller</button>
                <button id="quick-admin"  className="quick-btn admin"  onClick={() => quickLogin('admin')}>Admin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
