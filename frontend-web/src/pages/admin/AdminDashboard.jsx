import { useState } from 'react';
import { Users, ShoppingBag, DollarSign, Package, ShieldAlert, ClipboardList, Check, X as XIcon, Eye } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { platformStats, fraudAlerts, moderationQueue } from '../../data/mock';
import { useAuth } from '../../context/AuthContext';
import '../Dashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [modActions, setModActions] = useState({});
  const [fraudActions, setFraudActions] = useState({});

  const handleModAction = (id, action) => {
    setModActions(prev => ({ ...prev, [id]: action }));
  };

  const handleFraudAction = (id, action) => {
    setFraudActions(prev => ({ ...prev, [id]: action }));
  };

  const severityBadge = {
    critical: 'severity-critical',
    high: 'severity-high',
    medium: 'severity-medium',
    low: 'severity-low',
  };

  return (
    <div className="dashboard-content page-enter">
      <div className="dashboard-welcome">
        <div>
          <h1 className="h1">Admin Dashboard 🛡️</h1>
          <p className="text-secondary">Platform overview and operations, {user.name}.</p>
        </div>
      </div>

      {/* Platform KPIs */}
      <div className="stats-grid mb-6">
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'rgba(13,148,136,0.1)', color: '#0D9488' }}>
            <Users size={20} />
          </div>
          <div>
            <p className="stat-value">{platformStats.totalUsers.toLocaleString()}</p>
            <p className="stat-label">Total Users</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="stat-value">{platformStats.totalOrders.toLocaleString()}</p>
            <p className="stat-label">Total Orders</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <DollarSign size={20} />
          </div>
          <div>
            <p className="stat-value">${(platformStats.totalRevenue / 1000).toFixed(0)}K</p>
            <p className="stat-label">Revenue</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
            <Package size={20} />
          </div>
          <div>
            <p className="stat-value">{platformStats.activeListings.toLocaleString()}</p>
            <p className="stat-label">Active Listings</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid mb-6">
        <div className="card chart-card">
          <h3 className="h4 mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={platformStats.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }} />
              <Area type="monotone" dataKey="users" stroke="#0D9488" fill="rgba(13,148,136,0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card chart-card">
          <h3 className="h4 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={platformStats.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }} />
              <Area type="monotone" dataKey="revenue" stroke="var(--success)" fill="var(--success-bg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fraud Alerts */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert size={20} className="text-error" />
          <h2 className="h3">Fraud Alerts</h2>
          <span className="badge badge-error" style={{ marginLeft: 'auto' }}>
            {fraudAlerts.filter(f => f.status === 'open').length} Open
          </span>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Type</th>
                <th>User</th>
                <th>Amount</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fraudAlerts.map(alert => (
                <tr key={alert.id}>
                  <td>
                    <span className={`badge ${severityBadge[alert.severity]}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="body-sm">{alert.type.replace('-', ' ')}</td>
                  <td className="font-semibold body-sm">{alert.userName}</td>
                  <td>{alert.amount ? `$${alert.amount.toFixed(2)}` : '—'}</td>
                  <td>
                    <div className="risk-bar">
                      <div className="risk-fill" style={{ width: `${alert.riskScore}%`, background: alert.riskScore > 80 ? 'var(--error)' : alert.riskScore > 60 ? 'var(--warning)' : 'var(--secondary)' }} />
                    </div>
                    <span className="caption">{alert.riskScore}%</span>
                  </td>
                  <td>
                    <span className={`badge ${alert.status === 'open' ? 'badge-error' : alert.status === 'investigating' ? 'badge-warning' : 'badge-success'}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td>
                    {fraudActions[alert.id] ? (
                      <span className="caption text-muted">{fraudActions[alert.id]}</span>
                    ) : (
                      <div className="flex gap-1">
                        <button className="btn btn-ghost btn-sm" onClick={() => handleFraudAction(alert.id, 'Investigating')}>
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => handleFraudAction(alert.id, 'Dismissed')}>
                          <XIcon size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={20} className="text-warning" />
          <h2 className="h3">Moderation Queue</h2>
          <span className="badge badge-warning" style={{ marginLeft: 'auto' }}>
            {moderationQueue.filter(m => !modActions[m.id]).length} Pending
          </span>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Seller</th>
                <th>Category</th>
                <th>Submitted</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {moderationQueue.map(item => (
                <tr key={item.id}>
                  <td className="font-semibold">{item.productName}</td>
                  <td className="text-secondary">{item.sellerName}</td>
                  <td>{item.category}</td>
                  <td className="body-sm text-secondary">{new Date(item.submittedAt).toLocaleDateString()}</td>
                  <td><span className="badge badge-info">{item.reason}</span></td>
                  <td>
                    {modActions[item.id] ? (
                      <span className={`badge ${modActions[item.id] === 'Approved' ? 'badge-success' : 'badge-error'}`}>
                        {modActions[item.id]}
                      </span>
                    ) : (
                      <div className="flex gap-1">
                        <button className="btn btn-success btn-sm" onClick={() => handleModAction(item.id, 'Approved')}>
                          <Check size={14} />
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleModAction(item.id, 'Rejected')}>
                          <XIcon size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
