import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLeaf, FaTruck, FaShieldAlt, FaStar, FaMedal } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts, getCategories } from '../../utils/api';
import './Home.css';



const CATEGORY_EMOJIS = { churan: '🌿', goli: '💊', mukhwas: '🌺', achar: '🫙', masala: '🌶️', default: '🌱' };
const HERO_IMGS = [
  'https://i.pinimg.com/1200x/ce/f1/c0/cef1c096b226c4f82fe0964d1d712469.jpg',
  'https://i.pinimg.com/736x/20/dc/1b/20dc1b701efe08206606eaebebf2a776.jpg',
  'https://i.pinimg.com/736x/a1/03/d4/a103d426598adca0369a8eb6962dc7cb.jpg',
  'https://i.pinimg.com/736x/8e/06/dd/8e06dd824552b290507bb5f2969a9d61.jpg',
];
const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Ahmedabad', text: '"Gokulesh ka churan bahut achha hai! Hamare ghar mein sab use karte hain. Quality ekdum original lagti hai."', stars: 5 },
  { name: 'Ramesh Patel', city: 'Surat', text: '"Mukhwas is absolutely refreshing and natural. The achar is exactly like homemade. Highly recommend to everyone!"', stars: 5 },
  { name: 'Kavita Mehta', city: 'Vadodara', text: '"Been buying from Gokulesh for 3 years. Their masala quality is unmatched. Fast delivery, great packaging too."', stars: 5 },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [catProducts, setCatProducts] = useState({});

  useEffect(() => {
    getProducts({ featured: true, limit: 8 }).then(r => setFeatured(r.data.products));
    getCategories().then(r => {
      const cats = Array.isArray(r.data)
        ? r.data
        : Array.isArray(r.data?.categories)
          ? r.data.categories
          : [];

      setCategories(cats);

      cats.slice(0, 4).forEach(cat => {
        getProducts({ category: cat._id, limit: 4 }).then(p =>
          setCatProducts(prev => ({ ...prev, [cat._id]: p.data.products || [] }))
        );
      });
    });
  }, []);

  const DEMO_CATS = ['Churan', 'Goli & Tablets', 'Mukhwas', 'Achar & Pickles', 'Masala & Spices', 'Herbal Mix'];

  const safeFeatured = Array.isArray(featured) ? featured : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-eyebrow"><FaLeaf /> Pure · Natural · Traditional</div>
            <h1>India's Finest<br /><em>Ayurvedic Products</em><br />at Your Door</h1>
            <p>From digestive churan and fresh achar to fragrant mukhwas and authentic masalas — crafted with age-old recipes, delivered to your home.</p>
            <div className="hero-cta">
              <Link to="/products" className="btn btn-accent btn-lg">Shop Now <FaArrowRight /></Link>
              <Link to="/products?featured=true" className="btn btn-outline btn-lg" style={{ color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.4)' }}>View Featured</Link>
            </div>
            <div className="hero-trust">
              <div className="trust-chip"><span>⭐</span> 10,000+ Happy Customers</div>
              <div className="trust-chip"><span>🚚</span> Free Delivery ₹499+</div>
              <div className="trust-chip"><span>🌿</span> No Preservatives</div>
              <div className="trust-chip">
                <span>💳</span>
                <span>
                  Secure Payments with{' '}
                  <Link to="/policies#payment-gateway" className="trust-link">PhonePe</Link>
                </span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-img-grid">
              {HERO_IMGS.map((src, i) => (
                <div className="hero-img-cell" key={i}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="offer-bar">
        <div className="offer-bar-inner">
          {[...Array(2)].map((_, ri) =>
            ['🌿 Free Delivery on Orders ₹499+', '🎁 Use Code GOKULESH10 for 10% Off', '⭐ 10,000+ Happy Customers', '🫙 Fresh Homestyle Achar', '🌶️ Pure Spice Masalas', '🌺 Fragrant Mukhwas Collections'].map((t, i) => (
              <span key={`${ri}-${i}`} className="offer-item">{t}</span>
            ))
          )}
        </div>
      </div>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <h2 className="section-title">Shop by <span>Category</span></h2>
              <p className="section-subtitle">Pick your favourites from our most-loved Ayurvedic ranges</p>
            </div>
          </div>
          <div className="cat-grid">
            {((Array.isArray(categories) && categories.length > 0)
              ? categories
              : DEMO_CATS.map((n, i) => ({ _id: i, name: n, slug: n.toLowerCase() })))
              .map(cat => (
              <Link to={`/products?category=${cat._id}`} key={cat._id} className="cat-card">
                <div className="cat-img">
                  <span className="cat-emoji">{CATEGORY_EMOJIS[cat.slug] || CATEGORY_EMOJIS.default}</span>
                </div>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-tagline">Discover Ayurvedic {cat.name.toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="features-strip">
        <div className="container">
          <div className="features-grid">
            {[
              { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ₹499' },
              { icon: '🌿', title: '100% Natural', sub: 'No artificial preservatives' },
              { icon: '🏺', title: 'Traditional Recipes', sub: 'Made with ancient wisdom' },
              { icon: '⭐', title: 'Quality Assured', sub: 'Tested & certified pure' },
            ].map((f, i) => (
              <div key={i} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="how-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <h2 className="section-title">How <span>Gokulesh</span> Works</h2>
              <p className="section-subtitle">Simple steps from our kitchen to your home</p>
            </div>
          </div>
          <div className="how-grid">
            <div className="how-card">
              <div className="how-icon how-icon-1"><FaLeaf /></div>
              <h3>1. Browse & Choose</h3>
              <p>Explore authentic churan, mukhwas, achar and masala curated for everyday wellness.</p>
            </div>
            <div className="how-card">
              <div className="how-icon how-icon-2"><FaMedal /></div>
              <h3>2. Add to Cart</h3>
              <p>Check clear pricing, ingredients and benefits before adding to your cart.</p>
            </div>
            <div className="how-card">
              <div className="how-icon how-icon-3"><FaShieldAlt /></div>
              <h3>3. Pay Securely</h3>
              <p>Choose Cash on Delivery or pay online safely via PhonePe payment gateway.</p>
            </div>
            <div className="how-card">
              <div className="how-icon how-icon-4"><FaTruck /></div>
              <h3>4. Delivered Fresh</h3>
              <p>We pack with care and ship quickly so your products reach you fresh and sealed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {safeFeatured.length > 0 && (
        <section className="home-section alt-bg">
          <div className="container">
            <div className="section-head-row">
              <div>
                <h2 className="section-title">Featured <span>Products</span></h2>
                <p className="section-subtitle">Hand-picked bestsellers just for you</p>
              </div>
              <Link to="/products?featured=true" className="view-all-link">View all →</Link>
            </div>
            <div className="grid-4">
              {safeFeatured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Promo Banner */}
      <div className="container">
        <div className="promo-banner">
          <div className="promo-text">
            <h2>Get 10% off automatically on orders above ₹999!</h2>
            <p>Use code below at checkout. Valid on orders above ₹999</p>
            <div className="promo-code">GOKULESH10</div>
          </div>
          <Link to="/products" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', flexShrink: 0 }}>
            Shop Now <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Category-wise Sections */}
      {safeCategories.slice(0, 4).map((cat, idx) => {
        const products = Array.isArray(catProducts[cat._id]) ? catProducts[cat._id] : [];

        return products.length > 0 ? (
          <section key={cat._id} className={`home-section ${idx % 2 === 0 ? '' : 'alt-bg'}`}>
            <div className="container">
              <div className="section-head-row">
                <div>
                  <h2 className="section-title">{CATEGORY_EMOJIS[cat.slug] || '🌿'} {cat.name}</h2>
                  {cat.description && <p className="section-subtitle">{cat.description}</p>}
                </div>
                <Link to={`/products?category=${cat._id}`} className="view-all-link">View all →</Link>
              </div>
              <div className="grid-4">
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </div>
          </section>
        ) : null;
      })}

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <h2 className="section-title">What Our <span>Customers Say</span></h2>
              <p className="section-subtitle">Join thousands of happy families</p>
            </div>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">{'★'.repeat(t.stars)}</div>
                <p>{t.text}</p>
                <div className="reviewer">
                  <div className="reviewer-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>📍 {t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
