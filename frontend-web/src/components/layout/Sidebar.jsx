import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Package, ClipboardList, Heart, BarChart3,
  ShieldAlert, Users, Settings, Sparkles, DollarSign, AlertTriangle,
  ShoppingBag, TrendingUp
} from 'lucide-react';
import './Sidebar.css';

const sidebarConfig = {
  buyer: {
    accent: 'buyer',
    links: [
      { to: '/dashboard/buyer', icon: LayoutDashboard, label: 'Dashboard', exact: true },
      { to: '/dashboard/buyer/orders', icon: ClipboardList, label: 'My Orders' },
      { to: '/dashboard/buyer/wishlist', icon: Heart, label: 'Wishlist' },
      { to: '/dashboard/buyer/recommendations', icon: Sparkles, label: 'For You' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
  seller: {
    accent: 'seller',
    links: [
      { to: '/dashboard/seller', icon: LayoutDashboard, label: 'Dashboard', exact: true },
      { to: '/dashboard/seller/products', icon: Package, label: 'My Products' },
      { to: '/dashboard/seller/orders', icon: ShoppingBag, label: 'Orders' },
      { to: '/dashboard/seller/analytics', icon: TrendingUp, label: 'Analytics' },
      { to: '/dashboard/seller/pricing', icon: Sparkles, label: 'AI Pricing' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
  admin: {
    accent: 'admin',
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
          {user.role === 'buyer' ? '🛒' : user.role === 'seller' ? '🏪' : '🛡️'}
          <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {config.links.map(link => {
          const Icon = link.icon;
          const isActive = link.exact
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to);
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{link.label}</span>
              {link.label === 'AI Pricing' && (
                <span className="badge badge-ai" style={{ marginLeft: 'auto', fontSize: '0.6rem', padding: '1px 6px' }}>AI</span>
              )}
              {link.label === 'For You' && (
                <span className="badge badge-ai" style={{ marginLeft: 'auto', fontSize: '0.6rem', padding: '1px 6px' }}>✨</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
