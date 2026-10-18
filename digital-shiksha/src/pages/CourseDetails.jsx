// src/pages/CourseDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { storageService } from '../services/storageService';
import { progressService } from '../services/progressService';
import { AuthContext } from '../context/AuthContext';
import { LESSONS } from '../data/lessons';

export const CourseDetails = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [firstLessonId, setFirstLessonId] = useState(null);

  useEffect(() => {
    // Ensure courses are seeded
    let courses = storageService.getCourses();
    if (courses.length === 0) {
      const { COURSES } = require('../data/courses');
      storageService.setCourses(COURSES);
      courses = COURSES;
    }
    const found = courses.find((c) => c.id === courseId);
    setCourse(found || null);

    // Find first lesson id from lessons data
    const courseLessons = LESSONS[courseId] || [];
    if (courseLessons.length > 0) {
      setFirstLessonId(courseLessons[0].id);
    }

    if (user && found) {
      const totalLessons = found.lessons || 0;
      if (totalLessons > 0) {
        const userProg = progressService.getUserProgress(user.id);
        const courseProg = userProg[courseId] || { completedLessons: [] };
        const percent = Math.round(
          (courseProg.completedLessons.length / totalLessons) * 100
        );
        setProgress(percent);
      }
    }
  }, [courseId, user]);

  if (!course) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Course not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 page-content-sm">
        {/* Header */}
        <div className={`rounded-2xl p-8 mb-8 border ${course.borderColor} ${course.bgColor}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest ${course.textColor}`}>
                {course.difficulty} · {course.duration}
              </span>
              <h1 className={`text-3xl font-bold mt-1 ${course.textColor}`}>{course.title}</h1>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
          <p className="text-sm text-gray-500 mt-3">{course.lessons} lessons</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {firstLessonId ? (
            <Link to={`/courses/${course.id}/lesson/${firstLessonId}`} className="btn-primary">
              {progress > 0 ? 'Continue Learning' : 'Start Learning'}
            </Link>
          ) : (
            <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
              Coming Soon
            </button>
          )}
          <Link to={`/courses/${course.id}/quiz/${course.id}`} className="btn-outline">
            Take Quiz
          </Link>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Your Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{progress}% completed</p>
        </div>

        {/* Objectives */}
        {course.objectives && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">What You'll Learn</h2>
            <ul className="space-y-3">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
