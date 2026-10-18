// src/components/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from './ProgressCard';

/**
 * CourseCard – displays icon, title, description, difficulty, duration, progress.
 * Props: course (object from COURSES), progress (0-100)
 */
export const CourseCard = ({ course, progress = 0 }) => {
  const {
    id, title, description, icon,
    bgColor, textColor, borderColor,
    difficulty, duration,
  } = course;

  return (
    <div className={`card-hover rounded-xl border ${borderColor || 'border-gray-200'} ${bgColor || 'bg-white'} p-5 flex flex-col h-full`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${bgColor} ${textColor} border ${borderColor}`}>
          {difficulty}
        </span>
      </div>

      {/* Title */}
      <h3 className={`text-base font-bold ${textColor} mb-1`}>{title}</h3>

      {/* Description */}
      <p className="text-xs text-gray-600 flex-1 line-clamp-3 mb-3">{description}</p>

      {/* Meta */}
      <p className="text-xs text-gray-500 mb-3">🕐 {duration}</p>

      {/* Progress bar */}
      {progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar percent={progress} />
        </div>
      )}

      {/* CTA */}
      <Link
        to={`/courses/${id}`}
        className="mt-auto btn-primary text-sm self-start"
      >
        {progress > 0 ? 'Continue →' : 'Start Learning'}
      </Link>
    </div>
  );
};
