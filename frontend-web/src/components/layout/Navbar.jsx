import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Bell, Sun, Moon, User, LogOut, LayoutDashboard, Settings, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { notifications as allNotifications } from '../../data/mock';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const userDropdownRef = useRef(null);
  const notifRef = useRef(null);
  const sentinelRef = useRef(null);

  const userNotifs = isAuthenticated
    ? allNotifications.filter(n => n.userId === user.id)
    : [];
  const unreadCount = userNotifs.filter(n => !n.read).length;

  /* Scroll sentinel — IntersectionObserver instead of window.scroll listener */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /* Click-outside for dropdowns */
  useEffect(() => {
    const handleClick = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  /* Lock scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    return `/dashboard/${user.role}`;
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  /* Mobile menu nav items — stagger delays */
  const mobileLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    ...(isAuthenticated ? [{ to: getDashboardPath(), label: 'Dashboard' }] : []),
  ];

  return (
    <>
      {/* Scroll sentinel — sits at the very top of the page content */}
      <div ref={sentinelRef} style={{ position: 'absolute', top: 0, height: 1, width: 1, pointerEvents: 'none' }} aria-hidden="true" />

      <div className="navbar-wrapper">
        <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
          <div className="navbar-inner">
            {/* Left: Hamburger + Logo + Nav */}
            <div className="navbar-left">
              <button
                className="btn-icon mobile-menu-btn hide-desktop"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <span className={`hamburger-icon${mobileMenuOpen ? ' is-open' : ''}`}>
                  <span />
                  <span />
                  <span />
                </span>
              </button>

              <Link to="/" className="navbar-brand">
                <div className="brand-icon">M</div>
                <span className="brand-text">MarketBridge</span>
              </Link>

              <div className="navbar-links hide-mobile">
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                <Link to="/products" className={`nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}>Products</Link>
              </div>
            </div>

            {/* Center: Search */}
            <form className="navbar-search hide-mobile" onSubmit={handleSearch}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search products"
              />
            </form>

            {/* Right: Actions */}
            <div className="navbar-right">
              <button className="btn-icon theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {isAuthenticated && (
                <div className="notif-wrapper" ref={notifRef}>
                  <button className="btn-icon" onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications" aria-expanded={notifOpen}>
                    <Bell size={18} />
                    {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
                  </button>
                  {notifOpen && (
                    <div className="dropdown-panel notif-dropdown">
                      <div className="dropdown-header">
                        <h4>Notifications</h4>
                        <button className="btn-ghost btn-sm">Mark all read</button>
                      </div>
                      <div className="dropdown-list">
                        {userNotifs.length === 0 ? (
                          <div className="dropdown-empty">No notifications</div>
                        ) : (
                          userNotifs.map(n => (
                            <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                              <div className="notif-content">
                                <p className="notif-title">{n.title}</p>
                                <p className="notif-message">{n.message}</p>
                                <span className="notif-time">{timeAgo(n.date)}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Link to="/cart" className="btn-icon cart-btn" aria-label={`Cart — ${itemCount} items`}>
                <ShoppingCart size={18} />
                {itemCount > 0 && <span className="badge-count">{itemCount}</span>}
              </Link>

              {isAuthenticated ? (
                <div className="user-wrapper" ref={userDropdownRef}>
                  <button className="user-trigger" onClick={() => setUserDropdownOpen(!userDropdownOpen)} aria-expanded={userDropdownOpen}>
                    <div className="user-avatar">{user.avatar}</div>
                    <span className="user-name hide-mobile">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={12} className="hide-mobile" />
                  </button>
                  {userDropdownOpen && (
                    <div className="dropdown-panel user-dropdown">
                      <div className="dropdown-user-info">
                        <div className="user-avatar lg">{user.avatar}</div>
                        <div>
                          <p className="font-semibold" style={{ fontSize: '0.875rem', letterSpacing: '-0.01em' }}>{user.name}</p>
                          <p className="caption text-secondary">{user.email}</p>
                          <span className={`badge badge-${user.role === 'admin' ? 'info' : user.role === 'seller' ? 'warning' : 'primary'}`} style={{ marginTop: 4 }}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="dropdown-divider" />
                      <Link to={getDashboardPath()} className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        <LayoutDashboard size={15} /> Dashboard
                      </Link>
                      <Link to="/settings" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        <Settings size={15} /> Settings
                      </Link>
                      <div className="dropdown-divider" />
                      <button className="dropdown-item danger" onClick={handleLogout}>
                        <LogOut size={15} /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <form className="mobile-search" onSubmit={handleSearch}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
          {mobileLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-link ${location.pathname === link.to ? 'active' : ''}`}
              style={{ animationDelay: `${i * 50 + 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
