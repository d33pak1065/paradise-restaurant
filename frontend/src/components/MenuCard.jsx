import React from 'react';

const MenuCard = ({ item }) => {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('paradise_cart') || '[]');
    const found = cart.find(ci => ci._id === item._id);
    if (found) {
      found.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    localStorage.setItem('paradise_cart', JSON.stringify(cart));
    alert(`${item.name} added to cart`);
  };

  return (
    <div className="card">
      <img src={item.image} alt={item.name} className="card-img" />
      <div className="card-body">
        <h3>{item.name}</h3>
        <p className="desc">{item.description}</p>
        <div className="card-footer">
          <div className="price">₹{item.price.toFixed(2)}</div>
          <button className="btn" onClick={addToCart}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
