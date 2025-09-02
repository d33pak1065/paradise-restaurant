import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('paradise_cart') || '[]');
  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  const placeOrder = async () => {
    if (cart.length === 0) return alert('Cart empty');
    setLoading(true);
    try {
      const items = cart.map(i => ({ menuItem: i._id, qty: i.qty, price: i.price }));
      await API.post('/orders', { items, total });
      localStorage.removeItem('paradise_cart');
      alert('Order placed!');
      navigate('/orders');
    } catch (err) {
      console.error(err.response?.data || err.message);
  alert('Error placing order: ' + (err.response?.data?.message || 'Unknown error'));
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-panel">
        <div>
          <h3>Order</h3>
          {cart.map(i => (
            <div key={i._id} className="checkout-item">
              <span>{i.qty} x {i.name}</span>
              <span>₹{(i.qty * i.price).toFixed(2)}</span>
            </div>
          ))}
          <hr/>
          <div className="checkout-total">Total: ₹{total.toFixed(2)}</div>
        </div>
        <div>
          <h3>Payment</h3>
          <p>For demo, payment is mocked. Click place order to finish.</p>
          <button className="btn" onClick={placeOrder} disabled={loading}>
            {loading ? 'Placing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
