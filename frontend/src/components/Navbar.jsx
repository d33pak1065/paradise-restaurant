import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, getUser } from '../utils/auth';
import './nav.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">
          <div className="logo">Paradise</div>
          <div className="tag">Taste the bliss</div>
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/">Menu</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <Link to="/orders">Orders</Link>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            <button className="btn-link" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
