// src/components/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from './ProgressCard'; // reuse progress bar component

/**
 * CourseCard displays a course thumbnail, title, description, difficulty, duration, and progress.
 * Props: course (object from COURSES), progress (0-100)
 */
export const CourseCard = ({ course, progress = 0 }) => {
  const { id, title, titleHi, titleMr, description, descHi, descMr, icon, color, bgColor, textColor } = course;

  // Choose title/description based on language context (simplified: use English here)
  const displayTitle = title;
  const displayDesc = description;

  return (
    <div className={`card-hover rounded-xl shadow-sm border ${bgColor} p-4 flex flex-col h-full`}>
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className={`text-lg font-semibold ${textColor}`}>{displayTitle}</h3>
      </div>
      <p className="text-sm text-gray-600 flex-grow mb-4 line-clamp-3">{displayDesc}</p>
      <div className="mb-2">
        <ProgressBar percent={progress} />
      </div>
      <Link
        to={`/courses/${id}`}
        className="mt-auto btn-primary self-start"
      >
        {progress > 0 ? 'Continue' : 'Start'}
      </Link>
    </div>
  );
};
