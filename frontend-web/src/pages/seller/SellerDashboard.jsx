import { useState } from 'react';
import { DollarSign, Package, ShoppingBag, TrendingUp, Sparkles, AlertTriangle, Check, X as XIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { sellerProducts, sellerSalesData, aiPricingSuggestions } from '../../data/mock';
import { useAuth } from '../../context/AuthContext';
import '../Dashboard.css';

export default function SellerDashboard() {
  const { user } = useAuth();
  const [pricingActions, setPricingActions] = useState({});

  const handlePricingAction = (productId, action) => {
    setPricingActions(prev => ({ ...prev, [productId]: action }));
  };

  const totalRevenue = sellerProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalSales = sellerProducts.reduce((sum, p) => sum + p.sales, 0);
  const lowStockCount = sellerProducts.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length;

  const statusBadge = {
    active: 'badge-success',
    'low-stock': 'badge-warning',
    'out-of-stock': 'badge-error',
  };

  return (
    <div className="dashboard-content page-enter">
      <div className="dashboard-welcome">
        <div>
          <h1 className="h1">Seller Dashboard 🏪</h1>
          <p className="text-secondary">Welcome back, {user.name}. Here's your store overview.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid mb-6">
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <DollarSign size={20} />
          </div>
          <div>
            <p className="stat-value">${totalRevenue.toLocaleString()}</p>
            <p className="stat-label">Total Revenue</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="stat-value">{totalSales}</p>
            <p className="stat-label">Units Sold</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--info-bg)', color: 'var(--info)' }}>
            <Package size={20} />
          </div>
          <div>
            <p className="stat-value">{sellerProducts.length}</p>
            <p className="stat-label">Active Listings</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="stat-value">{lowStockCount}</p>
            <p className="stat-label">Low Stock</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid mb-6">
        <div className="card chart-card">
          <h3 className="h4 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={sellerSalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }} />
              <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--primary)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card chart-card">
          <h3 className="h4 mb-4">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={sellerSalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="orders" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Pricing Suggestions */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-info" />
          <h2 className="h3">AI Pricing Suggestions</h2>
        </div>
        <div className="ai-pricing-grid">
          {aiPricingSuggestions.map(suggestion => (
            <div key={suggestion.productId} className={`ai-card ai-card-glow ${pricingActions[suggestion.productId] ? 'actioned' : ''}`}>
              <div className="ai-card-header">
                <h4 className="body-sm font-semibold">{suggestion.productName}</h4>
                <span className="badge badge-ai">✨ AI</span>
              </div>
              <div className="pricing-comparison">
                <div className="pricing-col">
                  <span className="caption text-muted">Current</span>
                  <span className="pricing-value">${suggestion.currentPrice.toFixed(2)}</span>
                </div>
                <div className="pricing-arrow">{suggestion.trend === 'down' ? '↓' : '↑'}</div>
                <div className="pricing-col suggested">
                  <span className="caption text-muted">Suggested</span>
                  <span className="pricing-value" style={{ color: suggestion.trend === 'down' ? 'var(--error)' : 'var(--success)' }}>
                    ${suggestion.suggestedPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="pricing-range">
                <span className="caption text-muted">Range: ${suggestion.minBoundary.toFixed(2)} – ${suggestion.maxBoundary.toFixed(2)}</span>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{suggestion.confidence}% confidence</span>
              </div>
              <p className="pricing-reason">{suggestion.reason}</p>
              {pricingActions[suggestion.productId] ? (
                <div className={`pricing-actioned badge ${pricingActions[suggestion.productId] === 'accepted' ? 'badge-success' : 'badge-error'}`}>
                  {pricingActions[suggestion.productId] === 'accepted' ? '✓ Accepted' : '✕ Dismissed'}
                </div>
              ) : (
                <div className="pricing-actions">
                  <button className="btn btn-success btn-sm" onClick={() => handlePricingAction(suggestion.productId, 'accepted')}>
                    <Check size={14} /> Accept
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => handlePricingAction(suggestion.productId, 'dismissed')}>
                    <XIcon size={14} /> Dismiss
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="h3">My Products</h2>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sellerProducts.map(p => (
                <tr key={p.id}>
                  <td className="font-semibold" style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</td>
                  <td className="text-secondary">{p.category}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td className={p.stock < 15 ? 'text-warning font-semibold' : ''}>{p.stock}</td>
                  <td>{p.sales}</td>
                  <td className="font-semibold">${p.revenue.toLocaleString()}</td>
                  <td><span className={`badge ${statusBadge[p.status]}`}>{p.status.replace('-', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
