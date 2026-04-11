import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts, getCategories } from '../../utils/api';
import { resolveCategorySlugFromUrl, CATEGORY_QUICK_LINKS } from '../../constants/categoryRoutes';
import './CategoryPage.css';

export default function CategoryPage() {
  const { name: urlParam } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  const resolvedSlug = useMemo(() => resolveCategorySlugFromUrl(urlParam), [urlParam]);

  const categoryDoc = useMemo(() => {
    if (!categories.length || !resolvedSlug) return null;
    const s = resolvedSlug.toLowerCase();
    const raw = (urlParam || '').toLowerCase();
    return (
      categories.find((c) => (c.slug || '').toLowerCase() === s) ||
      categories.find((c) => (c.slug || '').toLowerCase() === raw) ||
      null
    );
  }, [categories, resolvedSlug, urlParam]);

  useEffect(() => {
    getCategories()
      .then((r) => {
        const list = Array.isArray(r.data) ? r.data : r.data?.categories || [];
        setCategories(list);
      })
      .finally(() => setCategoriesLoaded(true));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [urlParam]);

  useEffect(() => {
    if (!categoriesLoaded) return;
    if (!categoryDoc?._id) {
      setProducts([]);
      setTotal(0);
      setPages(1);
      setLoading(false);
      return;
    }
    setLoading(true);
    getProducts({ category: categoryDoc._id, page })
      .then((r) => {
        setProducts(r.data.products || []);
        setTotal(r.data.total ?? 0);
        setPages(r.data.pages ?? 1);
      })
      .finally(() => setLoading(false));
  }, [categoriesLoaded, categoryDoc, page]);

  useEffect(() => {
    if (!categoryDoc?.name) return;
    document.title = `${categoryDoc.name} | Gokulesh Pharmacy`;
    return () => {
      document.title = 'Gokulesh Pharmacy';
    };
  }, [categoryDoc]);

  if (!urlParam) {
    return <Navigate to="/products" replace />;
  }

  const allowedPaths = CATEGORY_QUICK_LINKS.map((c) => c.path);
  if (!allowedPaths.includes(urlParam.toLowerCase())) {
    return <Navigate to="/products" replace />;
  }

  if (categoriesLoaded && !categoryDoc) {
    return (
      <div className="category-page page">
        <div className="container category-page-inner">
          <div className="category-hero">
            <h1 className="category-title">Category not found</h1>
            <p className="category-subtitle">
              No category is configured for slug &quot;{resolvedSlug}&quot;. In Admin → Categories, create a
              category whose <strong>slug</strong> matches <strong>{resolvedSlug}</strong> (for Mukwas links,
              use slug <strong>mukhwas</strong>).
            </p>
            <Link to="/products" className="btn btn-primary">
              View all products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!categoriesLoaded) {
    return (
      <div className="category-page page">
        <div className="container category-page-inner">
          <div className="category-hero">
            <div className="skeleton" style={{ height: 40, width: '45%', maxWidth: 280, marginBottom: 14 }} />
            <div className="skeleton" style={{ height: 16, width: '70%', maxWidth: 420 }} />
          </div>
          <div className="grid-4 category-skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card category-skeleton-card">
                <div className="skeleton" style={{ aspectRatio: '1/1' }} />
                <div style={{ padding: 14 }}>
                  <div className="skeleton" style={{ height: 12, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 20, width: '70%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const displayTitle = categoryDoc?.name || resolvedSlug.replace(/-/g, ' ');

  return (
    <div className="category-page page">
      <div className="container category-page-inner">
        <nav className="category-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="category-bc-sep" aria-hidden="true">
            /
          </span>
          <Link to="/products">Products</Link>
          <span className="category-bc-sep" aria-hidden="true">
            /
          </span>
          <span>{displayTitle}</span>
        </nav>

        <header className="category-hero">
          <h1 className="category-title">{displayTitle}</h1>
          {categoryDoc?.description ? (
            <p className="category-description">{categoryDoc.description}</p>
          ) : (
            <p className="category-subtitle">
              Browse our selection of authentic Ayurvedic products in this category.
            </p>
          )}
          <p className="category-count" aria-live="polite">
            {loading ? 'Loading…' : `${total} product${total !== 1 ? 's' : ''} found`}
          </p>
        </header>

        {loading ? (
          <div className="grid-4 category-skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card category-skeleton-card">
                <div className="skeleton" style={{ aspectRatio: '1/1' }} />
                <div style={{ padding: 14 }}>
                  <div className="skeleton" style={{ height: 12, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 20, width: '70%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="category-empty">
            <div className="category-empty-icon" aria-hidden="true">
              🌿
            </div>
            <h2>No products found</h2>
            <p>There are no products in this category yet. Try another category or view all products.</p>
            <div className="category-empty-actions">
              <Link to="/products" className="btn btn-primary">
                All products
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid-4 category-product-grid">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
            {pages > 1 && (
              <div className="category-pagination" role="navigation" aria-label="Pagination">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`category-pg-btn ${page === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
