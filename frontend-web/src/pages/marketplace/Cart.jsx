import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Cart.css';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, tax, total, itemCount } = useCart();
  const { isAuthenticated } = useAuth();

  if (items.length === 0) {
    return (
      <div className="cart-page page-enter">
        <div className="container">
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p className="text-secondary">Looks like you haven't added anything yet.</p>
            <Link to="/products" className="btn btn-primary btn-lg mt-4">
              <ShoppingBag size={18} /> Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <h1 className="h1 mb-5">Shopping Cart ({itemCount} items)</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item card-flat">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-info">
                  <Link to={`/products/${item.id}`} className="cart-item-title">{item.title}</Link>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button className="btn-icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="btn-icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="btn-icon cart-remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary card">
            <h3 className="mb-4">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="text-success font-semibold">Free</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              to={isAuthenticated ? "/checkout" : "/login"}
              className="btn btn-primary btn-lg w-full mt-4"
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'} <ArrowRight size={16} />
            </Link>
            <Link to="/products" className="btn btn-ghost btn-md w-full mt-2" style={{ textAlign: 'center' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
