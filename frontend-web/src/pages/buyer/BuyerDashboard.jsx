import { Link } from 'react-router-dom';
import { Package, Eye, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { orders } from '../../data/mock';
import { products } from '../../data/products';
import ProductCard from '../../components/shared/ProductCard';
import '../Dashboard.css';

export default function BuyerDashboard() {
  const { user } = useAuth();
  const buyerOrders = orders.filter(o => o.buyerId === user.id);
  const aiRecommended = products.filter(p => p.aiRecommended).slice(0, 4);

  const statusColor = {
    delivered: 'badge-success',
    shipped: 'badge-info',
    processing: 'badge-warning',
    confirmed: 'badge-primary',
    pending: 'badge-warning',
  };

  return (
    <div className="dashboard-content page-enter">
      <div className="dashboard-welcome">
        <div>
          <h1 className="h1">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-secondary">Here's what's happening with your orders.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid mb-6">
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
            <Package size={20} />
          </div>
          <div>
            <p className="stat-value">{buyerOrders.length}</p>
            <p className="stat-label">Total Orders</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--info-bg)', color: 'var(--info)' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="stat-value">{buyerOrders.filter(o => o.status === 'shipped').length}</p>
            <p className="stat-label">In Transit</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <Eye size={20} />
          </div>
          <div>
            <p className="stat-value">{buyerOrders.filter(o => o.status === 'delivered').length}</p>
            <p className="stat-label">Delivered</p>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <p className="stat-value">4</p>
            <p className="stat-label">AI Picks</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="h3">Recent Orders</h2>
          <Link to="/dashboard/buyer/orders" className="btn btn-ghost btn-sm">View All</Link>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {buyerOrders.slice(0, 5).map(order => (
                <tr key={order.id}>
                  <td><Link to={`/orders/${order.id}`} style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{order.id}</Link></td>
                  <td>
                    <div className="order-items-preview">
                      {order.items.slice(0, 2).map(item => (
                        <img key={item.productId} src={item.image} alt="" className="order-item-thumb" />
                      ))}
                      {order.items.length > 2 && <span className="more-items">+{order.items.length - 2}</span>}
                    </div>
                  </td>
                  <td className="font-semibold">${order.total.toFixed(2)}</td>
                  <td><span className={`badge ${statusColor[order.status]}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                  <td className="text-secondary body-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-info" />
            <h2 className="h3">Recommended for You</h2>
          </div>
          <Link to="/products" className="btn btn-ghost btn-sm">View All</Link>
        </div>
        <div className="product-grid">
          {aiRecommended.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
