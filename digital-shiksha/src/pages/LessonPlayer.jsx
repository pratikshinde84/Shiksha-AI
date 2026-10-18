// src/pages/LessonPlayer.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { progressService } from '../services/progressService';
import { AuthContext } from '../context/AuthContext';
import { LESSONS } from '../data/lessons';

export const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);

  const courseLessons = LESSONS[courseId] || [];

  useEffect(() => {
    // Find lesson directly from static data (no storage indirection needed)
    const found = courseLessons.find((l) => l.id === lessonId);
    setLesson(found || null);

    // Check if already completed
    if (user && found) {
      const userProg = progressService.getUserProgress(user.id);
      const courseProg = userProg[courseId] || { completedLessons: [] };
      setCompleted(courseProg.completedLessons.includes(found.id));
    }
  }, [courseId, lessonId, user]);

  const handleComplete = () => {
    if (user && lesson && !completed) {
      // correct method name: completeLesson (not markLessonCompleted)
      progressService.completeLesson(user.id, courseId, lesson.id);
      setCompleted(true);
    }
  };

  const currentIndex = courseLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

  if (!lesson) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-gray-600">Lesson not found.</p>
          <Link to={`/courses/${courseId}`} className="btn-outline">Back to Course</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 page-content-sm">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
          <Link to="/courses" className="hover:text-primary hover:underline">Courses</Link>
          <span>/</span>
          <Link to={`/courses/${courseId}`} className="hover:text-primary hover:underline">Course</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{lesson.title}</span>
        </nav>

        {/* Lesson card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6">
          <h1 className="text-2xl font-bold text-primary mb-6">{lesson.title}</h1>

          {/* Render lesson content as plain text (content uses markdown-like syntax, not HTML) */}
          <div className="lesson-prose">
            {lesson.content}
          </div>
        </div>

        {/* Complete + Quiz buttons */}
        <div className="flex items-center gap-4 flex-wrap mb-8">
          <button
            className={`btn-primary ${completed ? 'opacity-60 cursor-default' : ''}`}
            onClick={handleComplete}
            disabled={completed}
          >
            {completed ? '✓ Completed' : 'Mark as Completed'}
          </button>
          {lesson.quizId && (
            <Link to={`/courses/${courseId}/quiz/${lesson.quizId}`} className="btn-outline">
              Take Lesson Quiz
            </Link>
          )}
        </div>

        {/* Prev / Next navigation */}
        <div className="flex justify-between gap-4">
          {prevLesson ? (
            <Link to={`/courses/${courseId}/lesson/${prevLesson.id}`} className="btn-outline text-sm flex-1 justify-center max-w-xs">
              ← {prevLesson.title}
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link to={`/courses/${courseId}/lesson/${nextLesson.id}`} className="btn-primary text-sm flex-1 justify-center max-w-xs ml-auto">
              {nextLesson.title} →
            </Link>
          ) : (
            <Link to={`/courses/${courseId}`} className="btn-primary text-sm flex-1 justify-center max-w-xs ml-auto">
              Finish Course →
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
