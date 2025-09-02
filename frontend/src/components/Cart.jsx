import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('paradise_cart') || '[]'));
  }, []);

  const updateQty = (id, qty) => {
    const newCart = cart.map(item => item._id === id ? { ...item, qty: Math.max(1, qty) } : item);
    setCart(newCart);
    localStorage.setItem('paradise_cart', JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter(i => i._id !== id);
    setCart(newCart);
    localStorage.setItem('paradise_cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  return (
    <div>
      <h1 className="page-title">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go to menu</Link></p>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price.toFixed(2)}</p>
                  <div className="qty-row">
                    <button onClick={() => updateQty(item._id, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                    <button className="remove" onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Summary</h3>
            <p>Total: <strong>₹{total.toFixed(2)}</strong></p>
            <button className="btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
