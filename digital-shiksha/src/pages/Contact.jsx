// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { storageService } from '../services/storageService';

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use versioned storageService key instead of raw localStorage
    const key = 'v1:digitalShiksha_contactMessages';
    const existing = storageService.get(key) || [];
    existing.push({ ...form, date: new Date().toISOString() });
    storageService.set(key, existing);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inputClass =
    'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-white/80 max-w-md mx-auto text-sm">
          Have a question, suggestion, or just want to say hi? We'd love to hear from you.
        </p>
      </section>

      <main className="flex-1 py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

          {/* Contact form */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send a Message</h2>

            {submitted && (
              <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm">
                ✓ Thank you! Your message has been received.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject" name="subject" type="text" required
                  value={form.subject} onChange={handleChange}
                  className={inputClass}
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message" name="message" rows={5} required
                  value={form.message} onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Write your message here…"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact info sidebar */}
          <div className="space-y-4">
            {[
              { emoji: '📧', label: 'Email', value: 'demo@digitalshiksha.org', href: 'mailto:demo@digitalshiksha.org' },
              { emoji: '📞', label: 'Phone', value: '+91 12345 67890', href: 'tel:+911234567890' },
              { emoji: '📍', label: 'Location', value: 'Maharashtra, India', href: null },
            ].map((item) => (
              <div key={item.label} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-sm text-gray-700 hover:text-primary hover:underline">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-700">{item.value}</p>
                )}
              </div>
            ))}

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Response Time</p>
              <p className="text-sm text-gray-700">
                This is a demo project. Messages are stored locally in your browser only.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
