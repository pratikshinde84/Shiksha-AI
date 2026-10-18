// src/components/Toast.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Simple toast notification system.
 * Usage: <Toast message="Saved" type="success" onClose={...} />
 */
export const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-primary'
  };

  return (
    <div className={`fixed bottom-4 right-4 max-w-xs p-3 rounded-lg shadow-lg text-white flex items-center ${bgColors[type]}`}> 
      <span className="flex-1 text-sm">{message}</span>
      <button onClick={() => { setVisible(false); if (onClose) onClose(); }} className="ml-2 hover:opacity-80">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
