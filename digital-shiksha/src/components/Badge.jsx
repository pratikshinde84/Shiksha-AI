// src/components/Badge.jsx
import React from 'react';
import { Star } from 'lucide-react';

/**
 * Badge component to display achievement icons.
 * Props: label (string), type ('info'|'success'|'warning'), icon optional.
 */
export const Badge = ({ label, type = 'info', icon = <Star className="h-4 w-4" /> }) => {
  const bg = {
    info: 'bg-primary',
    success: 'bg-green-600',
    warning: 'bg-yellow-600'
  }[type];
  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${bg} badge-glow`}> 
      {icon}
      <span className="ml-1">{label}</span>
    </div>
  );
};
