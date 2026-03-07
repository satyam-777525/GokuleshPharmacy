import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import {
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminGetCategories,
  adminUploadImages
} from '../../utils/api';
import toast from 'react-hot-toast';

const EMPTY = {
  name: '',
  slug: '',
  description: '',
  shortDescription: '',
  price: '',
  mrp: '',
  category: '',
  subCategory: '',
  stock: '',
  unit: 'piece',
  weight: '',
  ingredients: '',
  benefits: '',
  usage: '',
  isFeatured: false,
  isActive: true,
  images: ''
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');

  const load = () => adminGetProducts().then(r => setProducts(r.data));

  useEffect(() => {
    load();
    adminGetCategories().then(r => setCategories(r.data));
  }, []);

  const openNew = () => {
    setForm(EMPTY);
    setEditing(null);
    setModal(true);
  };

  const openEdit = p => {
    setForm({
      ...p,
      price: p.price,
      mrp: p.mrp || '',
      benefits: p.benefits?.join('\n') || '',
      images: p.images?.join('\n') || ''
    });
    setEditing(p._id);
    setImageFiles([]);
    setModal(true);
  };

  const handleImageFilesChange = e => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let images = form.images ? form.images.split('\n').filter(Boolean) : [];

      if (imageFiles.length) {
        setUploading(true);
        const fd = new FormData();
        imageFiles.forEach(file => fd.append('images', file));
        const res = await adminUploadImages(fd);
        images = images.concat(res.data.urls || []);
      }

      const payload = {
        ...form,
        price: Number(form.price),
        mrp: form.mrp ? Number(form.mrp) : undefined,
        stock: Number(form.stock),
        benefits: form.benefits
          ? form.benefits.split('\n').filter(Boolean)
          : [],
        images
      };

      if (editing) await adminUpdateProduct(editing, payload);
      else await adminCreateProduct(payload);

      toast.success(editing ? 'Product updated!' : 'Product created!');
      setModal(false);
      setImageFiles([]);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this product?')) return;
    await adminDeleteProduct(id);
    toast.success('Product deleted');
    load();
  };

  const filteredProducts = products.filter(p =>
    (p.name || '').toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <div className="admin-page-header">
        <h2 className="admin-page-title">
          Products ({filteredProducts.length}/{products.length})
        </h2>
        <button className="btn btn-primary" onClick={openNew}>
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <span className="admin-table-header-title">All Products</span>
          <div className="admin-search-wrap">
            <input
              type="text"
              className="admin-search"
              placeholder="Search products by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="admin-search-icon">🔍</span>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category?.name}</td>
                <td>₹{p.price}</td>
                <td>
                  <span
                    className={`badge ${
                      p.stock > 0 ? 'badge-green' : 'badge-red'
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td>{p.isFeatured ? '⭐' : '–'}</td>
                <td className="action-cell">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => openEdit(p)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 24 }}>
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    value={form.name}
                    onChange={e =>
                      setForm(p => ({
                        ...p,
                        name: e.target.value,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, '-')
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Slug *</label>
                  <input
                    value={form.slug}
                    onChange={e =>
                      setForm(p => ({ ...p, slug: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Short Description</label>
                <input
                  value={form.shortDescription}
                  onChange={e =>
                    setForm(p => ({
                      ...p,
                      shortDescription: e.target.value
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={form.description}
                  onChange={e =>
                    setForm(p => ({ ...p, description: e.target.value }))
                  }
                  rows={3}
                  required
                />
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>Price ₹ *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e =>
                      setForm(p => ({ ...p, price: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>MRP ₹</label>
                  <input
                    type="number"
                    value={form.mrp}
                    onChange={e =>
                      setForm(p => ({ ...p, mrp: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={e =>
                      setForm(p => ({ ...p, stock: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={form.category}
                    onChange={e =>
                      setForm(p => ({ ...p, category: e.target.value }))
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sub-Category</label>
                  <input
                    value={form.subCategory}
                    onChange={e =>
                      setForm(p => ({ ...p, subCategory: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Weight (e.g. 100g)</label>
                  <input
                    value={form.weight}
                    onChange={e =>
                      setForm(p => ({ ...p, weight: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input
                    value={form.unit}
                    onChange={e =>
                      setForm(p => ({ ...p, unit: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageFilesChange}
                />
                {imageFiles.length > 0 && (
                  <small
                    style={{
                      display: 'block',
                      marginTop: 6,
                      color: 'var(--text-muted)'
                    }}
                  >
                    {imageFiles.length} image
                    {imageFiles.length > 1 ? 's' : ''} selected
                  </small>
                )}
              </div>

              <div className="form-group">
                <label>Image URLs (one per line)</label>
                <textarea
                  value={form.images}
                  onChange={e =>
                    setForm(p => ({ ...p, images: e.target.value }))
                  }
                  rows={2}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>Benefits (one per line)</label>
                <textarea
                  value={form.benefits}
                  onChange={e =>
                    setForm(p => ({ ...p, benefits: e.target.value }))
                  }
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                <textarea
                  value={form.ingredients}
                  onChange={e =>
                    setForm(p => ({ ...p, ingredients: e.target.value }))
                  }
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label>Usage Instructions</label>
                <textarea
                  value={form.usage}
                  onChange={e =>
                    setForm(p => ({ ...p, usage: e.target.value }))
                  }
                  rows={2}
                />
              </div>

              <div className="form-check-row">
                <label>
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={e =>
                      setForm(p => ({
                        ...p,
                        isFeatured: e.target.checked
                      }))
                    }
                  />{' '}
                  Featured Product
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={e =>
                      setForm(p => ({
                        ...p,
                        isActive: e.target.checked
                      }))
                    }
                  />{' '}
                  Active
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={uploading}
              >
                {uploading
                  ? 'Uploading images...'
                  : editing
                  ? 'Update Product'
                  : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
