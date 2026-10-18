// src/context/LanguageContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en'); // en, hi, mr

  useEffect(() => {
    const saved = storageService.getLanguage();
    if (saved) setLang(saved);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    storageService.setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
