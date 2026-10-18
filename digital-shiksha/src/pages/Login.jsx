// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/**
 * Simple demo login – matches username (email) against stored users.
 * Password is not securely stored; this is purely for demonstration.
 */
export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('v1:digitalShiksha_users') || '[]');
    const match = storedUsers.find(u => u.username === form.username);
    if (!match) {
      setError('User not found. Please register first.');
      return;
    }
    // In a real app we would verify password hash; here we just accept any password.
    login({ id: match.id, name: match.fullName, username: match.username });
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-md mx-auto p-4 py-12">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Login</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">Email or Username</label>
            <input id="username" name="username" type="text" required value={form.username} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};
