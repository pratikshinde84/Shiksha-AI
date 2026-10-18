// src/pages/LessonPlayer.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { storageService } from '../services/storageService';
import { progressService } from '../services/progressService';
import { AuthContext } from '../context/AuthContext';

export const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const { user } = useContext(AuthContext);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const lessons = storageService.getLessons(courseId);
    const found = lessons.find(l => l.id === lessonId);
    setLesson(found);
  }, [courseId, lessonId]);

  const handleComplete = () => {
    if (user && lesson) {
      progressService.markLessonCompleted(user.id, courseId, lesson.id);
    }
  };

  if (!lesson) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Lesson not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto p-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        <button
          className="mt-6 btn-primary"
          onClick={handleComplete}
        >
          Mark as Completed
        </button>
      </main>
      <Footer />
    </div>
  );
};
