import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80';

export default function ProductCard({ product }) {
  const { addItem, items, updateQty, removeItem } = useCart();
  const [qty, setQty] = useState(1);

  const cartItem = items.find(i => i._id === product._id);
  const inCart = !!cartItem;

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault(); e.stopPropagation();
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${product.name} added!`, { duration: 1500 });
  };

  const handleIncrease = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (inCart) updateQty(product._id, cartItem.qty + 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!inCart) { setQty(q => Math.max(1, q - 1)); return; }
    if (cartItem.qty <= 1) { removeItem(product._id); return; }
    updateQty(product._id, cartItem.qty - 1);
  };

  const displayQty = inCart ? cartItem.qty : qty;

  return (
    <Link to={`/products/${product.slug}`} className="product-card">
      <div className="product-img-wrap">
        <img
          src={product.images?.[0] || PLACEHOLDER}
          alt={product.name}
          loading="lazy"
          onError={e => { e.target.src = PLACEHOLDER; }}
        />
        <div className="badges-top">
          {product.isFeatured && <span className="badge-featured">Featured</span>}
          {discount > 0 && <span className="badge-discount">{discount}% OFF</span>}
        </div>
        <div className="badge-veg" title="Pure Veg" />
        {product.stock === 0 && <div className="out-of-stock-overlay">Out of Stock</div>}
      </div>

      <div className="product-info">
        <span className="product-cat-tag">{product.category?.name || product.subCategory || 'Ayurvedic'}</span>
        <h3 className="product-name">{product.name}</h3>
        {product.weight && <span className="product-weight">{product.weight}</span>}

        <div className="product-price-section">
          <div className="price-row">
            <span className="price">₹{product.price}</span>
            {product.mrp && <span className="mrp">₹{product.mrp}</span>}
            {discount > 0 && <span className="save-text">Save ₹{product.mrp - product.price}</span>}
          </div>
        </div>

        <div className="card-bottom" onClick={e => e.preventDefault()}>
          <div className="qty-row">
            <button className="qty-btn" onClick={handleDecrease}>−</button>
            <span className="qty-val">{displayQty}</span>
            <button className="qty-btn" onClick={handleIncrease}>+</button>
          </div>
          <button
            className={`add-btn ${inCart ? 'in-cart' : ''}`}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {inCart ? <><FaCheck /> Added</> : <><FaShoppingCart /> Add to Cart</>}
          </button>
        </div>
      </div>
    </Link>
  );
}
