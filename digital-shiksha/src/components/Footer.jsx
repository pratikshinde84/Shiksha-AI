// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Icons removed due to missing exports in current lucide-react version

export const Footer = () => {
  const sections = [
    {
      titleKey: 'about',
      links: [
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
        { to: '/privacy', label: 'Privacy Notice' }
      ]
    },
    {
      titleKey: 'courses',
      links: [
        { to: '/courses', label: 'All Courses' },
        { to: '/courses?category=basics', label: 'Computer Basics' },
        { to: '/courses?category=internet', label: 'Internet' }
      ]
    }
  ];

  const socialIcons = [
    { component: null, href: '#', label: 'GitHub' },
    // { component: null, href: '#', label: 'Facebook' }, // Removed
    { component: null, href: '#', label: 'Twitter' },
    { component: null, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-50 text-gray-700 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Project description */}
        <div>
          <h2 className="text-xl font-bold gradient-text mb-2">Digital Shiksha</h2>
          <p className="text-sm mb-4">A demo educational platform bringing digital literacy to rural students in India. All data is stored locally in your browser.</p>
          <div className="flex space-x-4">
            {socialIcons.map(({ component: Icon, href, label }) => (
              <a key={label} href={href} className="text-gray-500 hover:text-primary" aria-label={label}>
                {Icon ? <Icon className="h-5 w-5" /> : <span className="text-xs">{label}</span>}
              </a>
            ))}
          </div>
        </div>
        {/* Quick links */}
        {sections.map((sec) => (
          <div key={sec.titleKey}>
            <h3 className="font-semibold mb-2 text-gray-800">{sec.titleKey === 'about' ? 'Quick Links' : 'Courses'}</h3>
            <ul className="space-y-1">
              {sec.links.map((ln) => (
                <li key={ln.to}>
                  <Link to={ln.to} className="text-sm hover:underline">{ln.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Contact placeholder */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">Contact</h3>
          <p className="text-sm">Email: <a href="mailto:demo@digitalshiksha.org" className="underline">demo@digitalshiksha.org</a></p>
          <p className="text-sm">Phone: +91 12345 67890</p>
          <p className="text-sm mt-2 text-gray-500 text-xs">© 2026 Digital Shiksha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
