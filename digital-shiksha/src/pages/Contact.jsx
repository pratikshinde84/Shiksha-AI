// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, Phone } from 'lucide-react';

/**
 * Contact page – simple demo form stored in LocalStorage.
 */
export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store locally – in a real app this would be sent to a server
    const existing = JSON.parse(localStorage.getItem('digitalShiksha_contactMessages') || '[]');
    existing.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem('digitalShiksha_contactMessages', JSON.stringify(existing));
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto p-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
        {submitted && (
          <div className="p-4 mb-4 bg-green-100 text-green-800 rounded">
            Thank you! Your message has been saved locally.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" required value={form.subject} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} required value={form.message} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
        <div className="mt-8 space-y-2 text-sm text-gray-600">
          <p><Mail className="inline-block mr-2" /> Email: <a href="mailto:demo@digitalshiksha.org" className="underline">demo@digitalshiksha.org</a></p>
          <p><Phone className="inline-block mr-2" /> Phone: +91 12345 67890</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
