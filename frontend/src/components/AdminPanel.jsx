import React, { useEffect, useState } from 'react';
import API from '../api/api';

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:'', description:'', category:'', price:0, image:'' });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get('/menu');
    setItems(res.data);
  };

  const create = async () => {
    await API.post('/menu', form);
    setForm({ name:'', description:'', category:'', price:0, image:'' });
    load();
  };

  const update = async () => {
    await API.put(`/menu/${editing._id}`, form);
    setEditing(null);
    setForm({ name:'', description:'', category:'', price:0, image:'' });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete item?')) return;
    await API.delete(`/menu/${id}`);
    load();
  };

  const startEdit = (it) => {
    setEditing(it);
    setForm({ name: it.name, description: it.description, category: it.category, price: it.price, image: it.image });
  };

  return (
    <div>
      <h1 className="page-title">Admin Panel</h1>
      <div className="admin-grid">
        <div className="admin-form">
          <h3>{editing ? 'Edit Item' : 'Create Item'}</h3>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
          <input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
          <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value)})} />
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <div>
            {editing ? <button className="btn" onClick={update}>Update</button> : <button className="btn" onClick={create}>Create</button>}
            {editing && <button className="btn ghost" onClick={()=>{setEditing(null); setForm({name:'',description:'',category:'',price:0,image:''})}}>Cancel</button>}
          </div>
        </div>

        <div className="admin-list">
          <h3>Menu Items</h3>
          {items.map(it => (
            <div className="admin-item" key={it._id}>
              <img src={it.image} alt={it.name} />
              <div>
                <strong>{it.name}</strong>
                <p>{it.category} • ₹{it.price.toFixed(2)}</p>
              </div>
              <div className="admin-actions">
                <button className="btn" onClick={()=>startEdit(it)}>Edit</button>
                <button className="btn ghost" onClick={()=>remove(it._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
