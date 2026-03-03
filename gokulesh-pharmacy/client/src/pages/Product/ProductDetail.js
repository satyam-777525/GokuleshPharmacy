import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { getProduct } from '../../utils/api';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import './ProductDetail.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem, items } = useCart();

  useEffect(() => {
    setLoading(true);
    getProduct(slug).then(r => setProduct(r.data)).catch(() => setProduct(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading-screen">Loading product...</div>;
  if (!product) return <div className="loading-screen" style={{ flexDirection: 'column', gap: 20 }}>
    <span style={{ fontSize: 48 }}>🌿</span>
    <p>Product not found.</p>
    <Link to="/products" className="btn btn-primary">Browse Products</Link>
  </div>;

  const images = product.images?.length ? product.images : [PLACEHOLDER];
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const inCart = items.some(i => i._id === product._id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`🛒 ${product.name} added to cart!`);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/products">Products</Link>
          <span className="breadcrumb-sep">›</span>
          {product.category?.name && <><Link to={`/products?category=${product.category._id}`}>{product.category.name}</Link><span className="breadcrumb-sep">›</span></>}
          <span>{product.name}</span>
        </div>

        <div className="detail-grid">
          {/* Gallery */}
          <div className="detail-images">
            <div className="main-img-wrap">
              <img src={images[activeImg]} alt={product.name} onError={e => { e.target.src = PLACEHOLDER; }} />
              {discount > 0 && <span className="img-discount-badge">{discount}% OFF</span>}
            </div>
            {images.length > 1 && (
              <div className="thumb-strip">
                {images.map((img, i) => (
                  <button key={i} className={`thumb-btn ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                    <img src={img} alt="" onError={e => { e.target.src = PLACEHOLDER; }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <div className="detail-cat">
              🌿 {product.category?.name}{product.subCategory && ` › ${product.subCategory}`}
            </div>
            <h1 className="detail-name">{product.name}</h1>
            <span className="veg-badge">🟢 Pure Veg · 100% Natural</span>
            {product.weight && <div className="detail-weight-tag">⚖️ {product.weight}</div>}

            <div className="detail-price-row">
              <span className="detail-price">₹{product.price}</span>
              {product.mrp && <span className="detail-mrp">₹{product.mrp}</span>}
              {discount > 0 && <span className="detail-save">You save ₹{product.mrp - product.price}</span>}
            </div>

            <div className={`stock-pill ${product.stock > 0 ? 'in' : 'out'}`}>
              {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
            </div>

            {product.shortDescription && <p className="detail-short-desc">{product.shortDescription}</p>}

            {product.stock > 0 && (
              <div className="add-to-cart-row">
                <div className="detail-qty">
                  <button className="dqb" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span className="dqv">{qty}</span>
                  <button className="dqb" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
                </div>
                <button className="btn btn-primary btn-lg" onClick={handleAdd} style={{ flex: 1 }}>
                  <FaShoppingCart /> {inCart ? 'Add More to Cart' : 'Add to Cart'}
                </button>
              </div>
            )}

            {product.benefits?.length > 0 && (
              <div className="detail-benefits">
                <h3>Key Benefits</h3>
                <ul className="benefits-list">
                  {product.benefits.map((b, i) => (
                    <li key={i}><span className="benefit-dot" />{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Description Tabs */}
        {(product.description || product.ingredients || product.usage) && (
          <div className="detail-desc-tabs">
            <div className="desc-tabs-grid">
              {product.description && (
                <div className="tab-block">
                  <h3>📜 Description</h3>
                  <p>{product.description}</p>
                </div>
              )}
              {product.ingredients && (
                <div className="tab-block">
                  <h3>🌿 Ingredients</h3>
                  <p>{product.ingredients}</p>
                </div>
              )}
              {product.usage && (
                <div className="tab-block">
                  <h3>💊 How to Use</h3>
                  <p>{product.usage}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
