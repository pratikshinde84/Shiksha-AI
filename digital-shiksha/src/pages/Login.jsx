// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { storageService } from '../services/storageService';

/**
 * Demo login — matches username against stored users.
 * Password comparison is plain-text for demo purposes only.
 */
export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Use storageService (consistent KEYS.USERS key — 'v1:digitalShiksha_users')
    const storedUsers = storageService.getUsers();
    const match = storedUsers.find(
      (u) => u.username === form.username.trim()
    );

    if (!match) {
      setError('User not found. Please register first.');
      setLoading(false);
      return;
    }

    // Demo: compare stored password (plain-text for demo only)
    if (match.password && match.password !== form.password) {
      setError('Incorrect password.');
      setLoading(false);
      return;
    }

    login({ id: match.id, name: match.fullName, username: match.username });
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center">
            Welcome Back
          </h1>

          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="username">
                Email or Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
