import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/my').then(res => setOrders(res.data)).catch(() => setOrders([]));
  }, []);

  return (
    <div>
      <h1 className="page-title">Your Orders</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <div className="orders-list">
          {orders.map(o => (
            <div className="order-card" key={o._id}>
              <div className="order-header">
                <div>Order #{o._id.slice(-6)}</div>
                <div>{new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div>
                {o.items.map(it => (
                  <div key={it.menuItem?._id || Math.random()} className="order-item">
                    <span>{it.qty} x {it.menuItem?.name || 'Item'}</span>
                    <span>₹{(it.qty * it.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <strong>Total: ₹{o.total.toFixed(2)}</strong>
                <span className="status">{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
