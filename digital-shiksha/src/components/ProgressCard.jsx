// src/components/ProgressCard.jsx
import React from 'react';

/**
 * Simple progress bar component used by CourseCard and dashboard.
 * Props: percent (0-100)
 */
export const ProgressBar = ({ percent }) => (
  <div className="progress-bar w-full">
    <div className="progress-fill" style={{ width: `${percent}%` }} />
  </div>
);

export const ProgressCard = ({ title, percent }) => (
  <div className="p-4 bg-white rounded-xl shadow-sm border">
    <h4 className="font-medium mb-2">{title}</h4>
    <ProgressBar percent={percent} />
    <p className="text-sm text-gray-600 mt-1">{percent}% completed</p>
  </div>
);
