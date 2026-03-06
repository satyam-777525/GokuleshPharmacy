import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=80';

export default function CartPage() {
  const { items, subtotal, discount, discountedSubtotal, couponCode, removeItem, updateQty, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some Ayurvedic goodness to your cart!</p>
            <Link to="/products" className="btn btn-primary btn-lg">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  const shipping = subtotal >= 499 ? 0 : 60;
  const grandTotal = discountedSubtotal + shipping;

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Shopping Cart <span style={{ fontSize: 20, fontWeight: 400, color: 'var(--text-muted)' }}>({items.length} items)</span></h1>

        <div className="cart-layout">
          <div>
            <div className="cart-items-list">
              {items.map(item => (
                <div key={item._id} className="cart-item-card">
                  <img
                    src={item.images?.[0] || PLACEHOLDER}
                    alt={item.name}
                    className="cart-item-img"
                    onError={e => { e.target.src = PLACEHOLDER; }}
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    {item.weight && <div className="cart-item-weight">{item.weight}</div>}
                    <div className="cart-item-price">₹{item.price} each</div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="cart-qty-ctrl">
                      <button className="cqb" onClick={() => { if (item.qty <= 1) removeItem(item._id); else updateQty(item._id, item.qty - 1); }}>−</button>
                      <span className="cqv">{item.qty}</span>
                      <button className="cqb" onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-item-sub">₹{item.price * item.qty}</span>
                    <button className="cart-remove" onClick={() => removeItem(item._id)} title="Remove">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={clearCart}>Clear Cart</button>
          </div>

          {/* Summary */}
          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="summary-line">
                <span>Coupon {couponCode} Applied</span>
                <span style={{ color: 'var(--success)', fontWeight: 700 }}>-₹{discount}</span>
              </div>
            )}
            <div className="summary-line">
              <span>Delivery</span>
              <span className={shipping === 0 ? 'free-text' : ''}>{shipping === 0 ? '🎉 FREE' : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <div className="free-ship-note">🚚 Add ₹{499 - subtotal} more for FREE delivery!</div>
            )}
            <div className="summary-line total">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
            <div className="cart-actions">
              <Link to="/checkout" className="btn btn-primary btn-lg btn-full">
                Proceed to Checkout <FaArrowRight />
              </Link>
              <Link to="/products" className="btn btn-outline btn-full">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
