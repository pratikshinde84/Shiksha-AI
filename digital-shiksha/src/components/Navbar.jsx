// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', labelKey: 'home' },
  { to: '/courses', labelKey: 'courses' },
  { to: '/practice', labelKey: 'practice' },
  { to: '/about', labelKey: 'about' },
];

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { lang, changeLanguage } = useContext(LanguageContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Use the shared translations file — no more duplicated inline object
  const t = translations[lang] || translations.en;

  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo — text-based fallback (no missing /images/logo.svg) */}
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={closeMobile}>
          <span className="text-2xl" aria-hidden="true">🎓</span>
          <span className="font-bold text-xl gradient-text">Digital Shiksha</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`
              }
            >
              {t[item.labelKey]}
            </NavLink>
          ))}

          {/* Language switcher */}
          <select
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="p-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
                {user.name}
              </span>
              <Link to="/dashboard" className="btn-outline text-sm py-1.5 px-3">
                {t.dashboard}
              </Link>
              <button onClick={logout} className="btn-primary text-sm py-1.5 px-3">
                {t.logout}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn-outline text-sm py-1.5 px-3">
                {t.login}
              </Link>
              <Link to="/register" className="btn-primary text-sm py-1.5 px-3">
                {t.register}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={toggleMobile}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-blue-50'
                      : 'text-gray-600 hover:text-primary hover:bg-blue-50'
                  }`
                }
              >
                {t[item.labelKey]}
              </NavLink>
            ))}

            {/* Language selector */}
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-sm"
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>

            {/* Auth links */}
            <div className="mt-3 space-y-2">
              {user ? (
                <>
                  <p className="text-sm font-medium text-gray-700 px-3">
                    {user.name}
                  </p>
                  <Link
                    to="/dashboard"
                    className="block w-full text-center btn-outline"
                    onClick={closeMobile}
                  >
                    {t.dashboard}
                  </Link>
                  <button
                    onClick={() => { logout(); closeMobile(); }}
                    className="block w-full text-center btn-primary"
                  >
                    {t.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center btn-outline"
                    onClick={closeMobile}
                  >
                    {t.login}
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center btn-primary"
                    onClick={closeMobile}
                  >
                    {t.register}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
