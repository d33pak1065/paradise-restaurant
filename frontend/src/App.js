import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={
              <ProtectedRoute><Checkout /></ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute><Orders /></ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} Paradise Restaurant</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
