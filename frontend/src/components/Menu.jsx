import React, { useEffect, useState } from 'react';
import API from '../api/api';
import MenuCard from './MenuCard';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const q = category ? `?category=${category}` : '';
        const res = await API.get(`/menu${q}`);
        setItems(res.data);

        // unique categories from response
        const cats = [...new Set(res.data.map(i => i.category))];
        setCategories(cats);
      } catch (err) {
        console.error('❌ Error fetching menu:', err);
      }
    };

    fetchMenu();
  }, [category]);

  return (
    <div className="menu-page">
      <h1 className="page-title">🍴 Paradise Menu</h1>

      {/* Filter Row */}
      <div className="filter-row">
        <button
          className={`chip ${category === '' ? 'active' : ''}`}
          onClick={() => setCategory('')}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`chip ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {items.map(item => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
