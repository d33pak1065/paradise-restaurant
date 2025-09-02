import React, { useState } from 'react';
import API from '../api/api';
import { setAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email:'', password:'' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      setAuth(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Login to Paradise</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
