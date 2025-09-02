import React, { useState } from 'react';
import API from '../api/api';
import { setAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      setAuth(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="auth-card">
      <h2>Create an account</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
