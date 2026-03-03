import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTimes } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts, getCategories } from '../../utils/api';
import './ProductsPage.css';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: '', maxPrice: '', page: 1
  });

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    params.page = filters.page;
    getProducts(params)
      .then(r => { setProducts(r.data.products); setTotal(r.data.total); setPages(r.data.pages); })
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { getCategories().then(r => setCategories(r.data)); }, []);

  const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  const clearFilters = () => setFilters({ search: '', category: '', minPrice: '', maxPrice: '', page: 1 });

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          {/* Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
            <div className="filters-head">
              <h3>🎯 Filters</h3>
              <button className="close-filters" onClick={() => setShowFilters(false)}><FaTimes /></button>
            </div>

            <div className="filter-block">
              <h4>Search</h4>
              <input type="text" placeholder="Type to search..." value={filters.search}
                onChange={e => updateFilter('search', e.target.value)} />
            </div>

            <div className="filter-block">
              <h4>Category</h4>
              <div className="cat-filter-list">
                <button className={`cat-filter-btn ${!filters.category ? 'active' : ''}`} onClick={() => updateFilter('category', '')}>
                  🌿 All Products
                </button>
                {categories.map(c => (
                  <button key={c._id} className={`cat-filter-btn ${filters.category === c._id ? 'active' : ''}`} onClick={() => updateFilter('category', c._id)}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-block">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input type="number" placeholder="₹ Min" value={filters.minPrice} onChange={e => updateFilter('minPrice', e.target.value)} />
                <span>–</span>
                <input type="number" placeholder="₹ Max" value={filters.maxPrice} onChange={e => updateFilter('maxPrice', e.target.value)} />
              </div>
            </div>

            <button className="btn btn-outline btn-full btn-sm" onClick={clearFilters}>Clear All Filters</button>
          </aside>

          {/* Main */}
          <div>
            <div className="products-topbar">
              <div className="results-info">
                <h1>All Products</h1>
                <span className="results-count">{total} products found</span>
              </div>
              <button className="btn btn-ghost filter-toggle-btn" onClick={() => setShowFilters(true)}>
                <FaFilter /> Filter
              </button>
            </div>

            {loading ? (
              <div className="grid-4">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="card" style={{ overflow: 'hidden' }}>
                    <div className="skeleton" style={{ aspectRatio: '1/1' }} />
                    <div style={{ padding: 14 }}>
                      <div className="skeleton" style={{ height: 12, marginBottom: 8 }} />
                      <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 8 }} />
                      <div className="skeleton" style={{ height: 14, width: '40%' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="empty-products">
                <p>🌿 No products found. Try different filters.</p>
                <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="grid-4">
                  {products.map(p => <ProductCard key={p._id} product={p} />)}
                </div>
                {pages > 1 && (
                  <div className="pagination">
                    {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                      <button key={p} className={`pg-btn ${filters.page === p ? 'active' : ''}`}
                        onClick={() => setFilters(prev => ({ ...prev, page: p }))}>{p}</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showFilters && <div className="filters-overlay" onClick={() => setShowFilters(false)} />}
    </div>
  );
}
