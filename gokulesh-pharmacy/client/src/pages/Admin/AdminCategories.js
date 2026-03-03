import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { adminGetCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory } from '../../utils/api';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });

  const load = () => adminGetCategories().then(r => setCategories(r.data));
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ name: '', slug: '', description: '' }); setEditing(null); setModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, slug: c.slug, description: c.description || '' }); setEditing(c._id); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await adminUpdateCategory(editing, form);
      else await adminCreateCategory(form);
      toast.success(editing ? 'Category updated!' : 'Category created!');
      setModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    await adminDeleteCategory(id);
    toast.success('Category deleted'); load();
  };

  return (
    <div>
      <div className="admin-page-header">
        <h2 className="admin-page-title">Categories</h2>
        <button className="btn btn-primary" onClick={openNew}><FaPlus /> Add Category</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Slug</th><th>Description</th><th>Actions</th></tr></thead>
          <tbody>
            {categories.map(c => (
              <tr key={c._id}>
                <td><strong>{c.name}</strong></td>
                <td><code>{c.slug}</code></td>
                <td>{c.description || '–'}</td>
                <td className="action-cell">
                  <button className="btn btn-sm btn-outline" onClick={() => openEdit(c)}><FaEdit /></button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(false)}>
          <div className="admin-modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h3>{editing ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={() => setModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group"><label>Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} required /></div>
              <div className="form-group"><label>Slug *</label>
                <input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} required /></div>
              <div className="form-group"><label>Description</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} /></div>
              <button type="submit" className="btn btn-primary btn-full">{editing ? 'Update' : 'Create'} Category</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
