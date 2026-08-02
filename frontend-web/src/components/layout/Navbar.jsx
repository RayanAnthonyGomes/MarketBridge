import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, ShoppingCart, Bell, Sun, Moon, User, LogOut,
  LayoutDashboard, Settings, ChevronDown, X, TrendingUp, ArrowRight, Tag
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { notifications as allNotifications } from '../../data/mock';
import { products, categories } from '../../data/products';
import './Navbar.css';

const popularSearches = [
  'Wireless Headphones',
  'Mechanical Keyboard',
  'Smart Lamp',
  'Urban Parka',
  'Coffee Set',
  'Atomic Habits',
  'Air Purifier',
  'Trekking Poles',
];

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
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userDropdownRef = useRef(null);
  const notifRef = useRef(null);
  const sentinelRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const userNotifs = isAuthenticated
    ? allNotifications.filter(n => n.userId === user.id)
    : [];
  const unreadCount = userNotifs.filter(n => !n.read).length;

  /* Scroll sentinel — IntersectionObserver */
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

  /* Click-outside for dropdowns & search suggestions */
  useEffect(() => {
    const handleClick = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (
        searchRef.current && !searchRef.current.contains(e.target) &&
        (!mobileSearchRef.current || !mobileSearchRef.current.contains(e.target))
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* Close mobile menu and search suggestions on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchFocused(false);
  }, [location]);

  /* Lock scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  /* Key listener for Escape key to close suggestions */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* Filter matching products, categories, and popular terms */
  const queryTerm = searchQuery.trim().toLowerCase();

  const matchingProducts = useMemo(() => {
    if (!queryTerm) return [];
    return products.filter(p =>
      p.title.toLowerCase().includes(queryTerm) ||
      p.category.toLowerCase().includes(queryTerm) ||
      p.tags.some(t => t.toLowerCase().includes(queryTerm)) ||
      p.description.toLowerCase().includes(queryTerm)
    ).slice(0, 4);
  }, [queryTerm]);

  const matchingCategories = useMemo(() => {
    if (!queryTerm) return [];
    return categories.filter(c =>
      c.name.toLowerCase().includes(queryTerm) ||
      c.id.toLowerCase().includes(queryTerm)
    );
  }, [queryTerm]);

  const matchingPopular = useMemo(() => {
    if (!queryTerm) return popularSearches.slice(0, 5);
    return popularSearches.filter(s => s.toLowerCase().includes(queryTerm));
  }, [queryTerm]);

  /* Handlers */
  const handleExecuteSearch = (term) => {
    const target = term !== undefined ? term : searchQuery;
    if (target.trim()) {
      navigate(`/products?search=${encodeURIComponent(target.trim())}`);
      setSearchFocused(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleExecuteSearch(searchQuery);
  };

  const handleSelectProduct = (productId) => {
    navigate(`/products/${productId}`);
    setSearchFocused(false);
  };

  const handleSelectCategory = (catId) => {
    navigate(`/products?category=${catId}`);
    setSearchFocused(false);
    setSearchQuery('');
  };

  const handleSelectSearchTerm = (term) => {
    setSearchQuery(term);
    handleExecuteSearch(term);
  };

  const handleClearSearch = (e) => {
    e.stopPropagation();
    setSearchQuery('');
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

  const mobileLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    ...(isAuthenticated ? [{ to: getDashboardPath(), label: 'Dashboard' }] : []),
  ];

  /* Search Suggestion Render helper */
  const renderSearchSuggestions = () => {
    if (!searchFocused) return null;

    return (
      <div className="search-suggestions dropdown-panel">
        {queryTerm ? (
          <>
            {/* Matching Categories */}
            {matchingCategories.length > 0 && (
              <div className="suggestion-group">
                <div className="suggestion-header">
                  <Tag size={12} /> Categories
                </div>
                <div className="suggestion-list">
                  {matchingCategories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      className="suggestion-item category-item"
                      onClick={() => handleSelectCategory(cat.id)}
                    >
                      <span className="cat-icon-badge">{cat.icon}</span>
                      <span className="suggestion-title">{cat.name}</span>
                      <span className="suggestion-badge">{cat.count} items</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Products */}
            {matchingProducts.length > 0 && (
              <div className="suggestion-group">
                <div className="suggestion-header">
                  <Search size={12} /> Products
                </div>
                <div className="suggestion-list">
                  {matchingProducts.map(prod => (
                    <button
                      key={prod.id}
                      type="button"
                      className="suggestion-item product-item"
                      onClick={() => handleSelectProduct(prod.id)}
                    >
                      <img src={prod.images[0]} alt={prod.title} className="suggestion-thumb" />
                      <div className="suggestion-prod-info">
                        <p className="suggestion-prod-title">{prod.title}</p>
                        <span className="suggestion-prod-cat">
                          {prod.category.replace('-', ' ')}
                        </span>
                      </div>
                      <span className="suggestion-prod-price">${prod.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Related Searches */}
            {matchingPopular.length > 0 && (
              <div className="suggestion-group">
                <div className="suggestion-header">
                  <TrendingUp size={12} /> Related Searches
                </div>
                <div className="suggestion-tags">
                  {matchingPopular.map(term => (
                    <button
                      key={term}
                      type="button"
                      className="suggestion-tag"
                      onClick={() => handleSelectSearchTerm(term)}
                    >
                      <Search size={11} /> {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No matches */}
            {matchingProducts.length === 0 && matchingCategories.length === 0 && matchingPopular.length === 0 && (
              <div className="suggestion-empty">
                <Search size={22} className="empty-search-icon" />
                <p className="empty-title">No matching products found</p>
                <span className="caption text-muted">
                  Try searching for "headphones", "keyboard", or "parka"
                </span>
              </div>
            )}

            {/* Footer action strip */}
            <div className="suggestion-footer">
              <button
                type="button"
                className="suggestion-view-all"
                onClick={() => handleExecuteSearch(searchQuery)}
              >
                <span>View all results for "<strong>{searchQuery}</strong>"</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        ) : (
          /* Default Focused State (No query yet) */
          <>
            <div className="suggestion-group">
              <div className="suggestion-header">
                <TrendingUp size={13} /> Popular Searches
              </div>
              <div className="suggestion-tags">
                {popularSearches.map(term => (
                  <button
                    key={term}
                    type="button"
                    className="suggestion-tag"
                    onClick={() => handleSelectSearchTerm(term)}
                  >
                    <TrendingUp size={11} /> {term}
                  </button>
                ))}
              </div>
            </div>

            <div className="suggestion-group">
              <div className="suggestion-header">
                <Tag size={13} /> Explore Categories
              </div>
              <div className="suggestion-categories-grid">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    className="suggestion-cat-card"
                    onClick={() => handleSelectCategory(cat.id)}
                  >
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-name">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
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

            {/* Center: Search with live suggestion strip */}
            <div className="navbar-search hide-mobile" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="search-form">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products, categories, brands..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!searchFocused) setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  className="search-input"
                  aria-label="Search products"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>
              {renderSearchSuggestions()}
            </div>

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
          <div className="mobile-search" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!searchFocused) setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </form>
            {renderSearchSuggestions()}
          </div>
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
