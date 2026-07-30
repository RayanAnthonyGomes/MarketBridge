import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Checkout.css';

export default function Checkout() {
  const { items, subtotal, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCompleted(true);
    clearCart();
  };

  if (completed) {
    return (
      <div className="checkout-page page-enter">
        <div className="container">
          <div className="order-success">
            <CheckCircle size={64} className="text-success" />
            <h1 className="h1 mt-4">Order Placed Successfully!</h1>
            <p className="text-secondary body-lg mt-2">Your order ORD-2026-{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')} has been confirmed.</p>
            <p className="text-secondary">You'll receive an email confirmation shortly.</p>
            <div className="flex gap-4 mt-5">
              <Link to="/dashboard/buyer" className="btn btn-primary btn-lg">View Orders</Link>
              <Link to="/products" className="btn btn-secondary btn-lg">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page page-enter">
      <div className="container">
        <nav className="breadcrumb mb-5">
          <Link to="/cart">Cart</Link>
          <ChevronRight size={14} />
          <span>Checkout</span>
        </nav>

        <form onSubmit={handlePlaceOrder}>
          <div className="checkout-layout">
            <div className="checkout-forms">
              {/* Shipping */}
              <div className="card mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={20} className="text-primary" />
                  <h2 className="h3">Shipping Address</h2>
                </div>
                <div className="form-grid">
                  <div className="input-group"><label className="input-label">Full Name</label><input className="input" defaultValue={user?.name} required /></div>
                  <div className="input-group"><label className="input-label">Phone</label><input className="input" defaultValue={user?.phone} required /></div>
                  <div className="input-group full-width"><label className="input-label">Address</label><input className="input" defaultValue={user?.address?.street} required /></div>
                  <div className="input-group"><label className="input-label">City</label><input className="input" defaultValue={user?.address?.city} required /></div>
                  <div className="input-group"><label className="input-label">State</label><input className="input" defaultValue={user?.address?.state} required /></div>
                  <div className="input-group"><label className="input-label">ZIP Code</label><input className="input" defaultValue={user?.address?.zip} required /></div>
                </div>
              </div>

              {/* Payment */}
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={20} className="text-primary" />
                  <h2 className="h3">Payment Method</h2>
                </div>
                <p className="caption text-muted mb-3">🔒 This is a prototype. No real payment is processed.</p>
                <div className="form-grid">
                  <div className="input-group full-width"><label className="input-label">Card Number</label><input className="input" placeholder="4242 4242 4242 4242" required /></div>
                  <div className="input-group"><label className="input-label">Expiry Date</label><input className="input" placeholder="MM/YY" required /></div>
                  <div className="input-group"><label className="input-label">CVV</label><input className="input" placeholder="123" required /></div>
                  <div className="input-group full-width"><label className="input-label">Name on Card</label><input className="input" defaultValue={user?.name} required /></div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="checkout-summary card">
              <h3 className="h3 mb-4">Order Summary</h3>
              <div className="checkout-items">
                {items.map(item => (
                  <div key={item.id} className="checkout-item">
                    <img src={item.image} alt="" className="checkout-item-img" />
                    <div className="flex-1">
                      <p className="body-sm font-semibold">{item.title}</p>
                      <p className="caption text-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="summary-divider" />
              <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="summary-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="summary-row"><span>Shipping</span><span className="text-success font-semibold">Free</span></div>
              <div className="summary-divider" />
              <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
              <button type="submit" className="btn btn-primary btn-lg w-full mt-4">Place Order</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
