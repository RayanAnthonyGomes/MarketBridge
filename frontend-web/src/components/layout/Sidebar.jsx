import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Package, ClipboardList, Heart, BarChart3,
  ShieldAlert, Users, Settings, Sparkles, DollarSign,
  ShoppingBag, TrendingUp
} from 'lucide-react';
import './Sidebar.css';

const sidebarConfig = {
  buyer: {
    accent: 'buyer',
    label: 'Buyer',
    links: [
      { to: '/dashboard/buyer', icon: LayoutDashboard, label: 'Dashboard', exact: true },
      { to: '/dashboard/buyer/orders', icon: ClipboardList, label: 'My Orders' },
      { to: '/dashboard/buyer/wishlist', icon: Heart, label: 'Wishlist' },
      { to: '/dashboard/buyer/recommendations', icon: Sparkles, label: 'For You', ai: true },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
  seller: {
    accent: 'seller',
    label: 'Seller',
    links: [
      { to: '/dashboard/seller', icon: LayoutDashboard, label: 'Dashboard', exact: true },
      { to: '/dashboard/seller/products', icon: Package, label: 'My Products' },
      { to: '/dashboard/seller/orders', icon: ShoppingBag, label: 'Orders' },
      { to: '/dashboard/seller/analytics', icon: TrendingUp, label: 'Analytics' },
      { to: '/dashboard/seller/pricing', icon: Sparkles, label: 'AI Pricing', ai: true },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
  admin: {
    accent: 'admin',
    label: 'Admin',
    links: [
      { to: '/dashboard/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
      { to: '/dashboard/admin/moderation', icon: ClipboardList, label: 'Moderation' },
      { to: '/dashboard/admin/fraud', icon: ShieldAlert, label: 'Fraud Alerts' },
      { to: '/dashboard/admin/users', icon: Users, label: 'Users' },
      { to: '/dashboard/admin/analytics', icon: BarChart3, label: 'Analytics' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
};

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !sidebarConfig[user.role]) return null;

  const config = sidebarConfig[user.role];

  return (
    <aside className={`sidebar sidebar-${config.accent}`}>
      <div className="sidebar-header">
        <div className={`sidebar-role-badge ${config.accent}`}>
          <span>{config.label} Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label={`${config.label} navigation`}>
        {config.links.map((link, index) => {
          const Icon = link.icon;
          const isActive = link.exact
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to);

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              /* --i drives the stagger delay in CSS */
              style={{ '--i': index }}
            >
              <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{link.label}</span>
              {link.ai && (
                <span
                  className="badge badge-ai"
                  style={{ marginLeft: 'auto', fontSize: '0.6rem', padding: '1px 6px' }}
                >
                  AI
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
