// src/pages/CourseDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { storageService } from '../services/storageService';
import { progressService } from '../services/progressService';
import { AuthContext } from '../context/AuthContext';
import { CourseCard } from '../components/CourseCard';

export const CourseDetails = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const courses = storageService.getCourses();
    const found = courses.find(c => c.id === courseId);
    setCourse(found);
    if (user && found) {
      const userProg = progressService.getUserProgress(user.id);
      const courseProg = userProg[courseId] || { completedLessons: [] };
      const percent = Math.round((courseProg.completedLessons.length / found.lessons) * 100);
      setProgress(percent);
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
      <main className="flex-1 max-w-4xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-4">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <p className="text-sm text-gray-500 mb-2">{course.lessons} lessons • {course.duration}</p>
        <div className="mb-6">
          <Link to={`/courses/${course.id}/lesson/${course.lessons}`} className="btn-primary mr-2">
            Start Learning
          </Link>
          <Link to={`/courses/${course.id}/quiz/${course.id}`} className="btn-outline">
            Take Quiz
          </Link>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-primary h-4 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-gray-600 mt-1">{progress}% completed</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
