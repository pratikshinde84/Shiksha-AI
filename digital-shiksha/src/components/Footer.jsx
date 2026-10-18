// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700 py-10">
      {/*
        3-column grid only — removed the separate contact column that was
        causing a 4th column to overflow the declared md:grid-cols-3.
        Contact info is now part of the third column.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎓</span>
            <h2 className="text-lg font-bold gradient-text">Digital Shiksha</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            A free educational platform bringing digital literacy to rural students across
            India. All data is stored locally in your browser.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-primary" aria-label="GitHub">GitHub</a>
            <a href="#" className="text-xs text-gray-500 hover:text-primary" aria-label="Twitter">Twitter</a>
            <a href="#" className="text-xs text-gray-500 hover:text-primary" aria-label="Instagram">Instagram</a>
          </div>
        </div>

        {/* Column 2 — Quick links */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/courses', label: 'All Courses' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
            ].map((ln) => (
              <li key={ln.to}>
                <Link to={ln.to} className="text-sm text-gray-600 hover:text-primary hover:underline">
                  {ln.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact + course categories */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">Contact</h3>
          <p className="text-sm mb-1">
            Email:{' '}
            <a href="mailto:demo@digitalshiksha.org" className="underline hover:text-primary">
              demo@digitalshiksha.org
            </a>
          </p>
          <p className="text-sm mb-4">Phone: +91 12345 67890</p>

          <h3 className="font-semibold mb-2 text-gray-800">Popular Courses</h3>
          <ul className="space-y-1">
            {[
              { to: '/courses', label: 'Computer Fundamentals' },
              { to: '/courses', label: 'Internet Basics' },
              { to: '/courses', label: 'Digital Payments' },
            ].map((ln) => (
              <li key={ln.label}>
                <Link to={ln.to} className="text-sm text-gray-600 hover:text-primary hover:underline">
                  {ln.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          © 2026 Digital Shiksha. All rights reserved. · Built for rural digital education.
        </p>
      </div>
    </footer>
  );
};
