// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', labelKey: 'home' },
  { to: '/courses', labelKey: 'courses' },
  { to: '/practice', labelKey: 'practice' },
  { to: '/about', labelKey: 'about' },
  { to: '/ai-assistant', labelKey: 'aiAssistant' }
];

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { lang, changeLanguage } = useContext(LanguageContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const translations = {
    en: {
      home: 'Home',
      courses: 'Courses',
      practice: 'Practice Zone',
      about: 'About Us',
      aiAssistant: 'AI Assistant',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      logout: 'Logout'
    },
    hi: {
      home: 'मुख्य पृष्ठ',
      courses: 'कोर्स',
      practice: 'प्रैक्टिस ज़ोन',
      about: 'हमारे बारे में',
      aiAssistant: 'एआई सहायक',
      login: 'लॉगिन',
      register: 'रजिस्टर',
      dashboard: 'डैशबोर्ड',
      logout: 'लॉगआउट'
    },
    mr: {
      home: 'मुख्य पृष्ठ',
      courses: 'कोर्सेस',
      practice: 'प्रॅक्टिस झोन',
      about: 'आमच्याबद्दल',
      aiAssistant: 'एआय सहायक',
      login: 'लॉगिन',
      register: 'नोंदणी',
      dashboard: 'डॅशबोर्ड',
      logout: 'लॉगआउट'
    }
  };

  const t = translations[lang] || translations.en;

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="Digital Shiksha" className="h-8 w-8 animate-float" />
          <span className="font-bold text-xl gradient-text">Digital Shiksha</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-600'} hover:text-primary transition`
              }
            >
              {t[item.labelKey]}
            </NavLink>
          ))}
          {/* Language switcher */}
          <select
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="ml-4 p-1 border rounded"
            aria-label="Language selector"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
          {/* Auth links */}
          {user ? (
            <div className="flex items-center space-x-4 ml-4">
              <span className="text-sm font-medium text-gray-800">{user.name}</span>
              <Link to="/dashboard" className="btn-outline text-sm">{t.dashboard}</Link>
              <button onClick={logout} className="btn-primary text-sm">{t.logout}</button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 ml-4">
              <Link to="/login" className="btn-outline text-sm">{t.login}</Link>
              <Link to="/register" className="btn-primary text-sm">{t.register}</Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={toggleMobile}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white glass shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-primary' : 'text-gray-600'} hover:text-primary`
                }
              >
                {t[item.labelKey]}
              </NavLink>
            ))}
            {/* Language selector for mobile */}
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="block w-full p-2 border rounded"
              aria-label="Language selector"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
            {/* Auth links mobile */}
            {user ? (
              <div className="mt-2 space-y-1">
                <Link to="/dashboard" className="block w-full text-left btn-outline" onClick={() => setMobileOpen(false)}>{t.dashboard}</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left btn-primary">{t.logout}</button>
              </div>
            ) : (
              <div className="mt-2 space-y-1">
                <Link to="/login" className="block w-full text-left btn-outline" onClick={() => setMobileOpen(false)}>{t.login}</Link>
                <Link to="/register" className="block w-full text-left btn-primary" onClick={() => setMobileOpen(false)}>{t.register}</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
