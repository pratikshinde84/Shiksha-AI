// src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/**
 * Demo registration – stores user in LocalStorage.
 * Fields: full name, email/username, password, confirm, language, optional grade.
 */
export const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', username: '', password: '', confirmPassword: '', language: 'en', grade: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Create a simple user object
    const newUser = {
      id: `user-${Date.now()}`,
      fullName: form.fullName,
      username: form.username,
      language: form.language,
      grade: form.grade || null
    };
    register(newUser);
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-md mx-auto p-4 py-12">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">Register</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">Email or Username</label>
            <input id="username" name="username" type="text" required value={form.username} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="language">Preferred Language</label>
            <select id="language" name="language" value={form.language} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="grade">Grade / Class (optional)</label>
            <input id="grade" name="grade" type="text" value={form.grade} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g., 10th" />
          </div>
          <button type="submit" className="btn-primary w-full">Register</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};
