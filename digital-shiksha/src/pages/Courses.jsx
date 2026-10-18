// src/pages/Courses.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CourseCard } from '../components/CourseCard';
import { storageService } from '../services/storageService';
import { progressService } from '../services/progressService';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Courses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    // Seed courses if not present
    let stored = storageService.getCourses();
    if (stored.length === 0) {
      // Import default courses data
      const { COURSES } = require('../data/courses');
      storageService.setCourses(COURSES);
      stored = COURSES;
    }
    setCourses(stored);
    if (user) {
      const userProg = progressService.getUserProgress(user.id);
      setProgressMap(userProg);
    }
  }, [user]);

  const getCourseProgress = (courseId) => {
    const totalLessons = courses.find(c => c.id === courseId)?.lessons || 0;
    if (!totalLessons) return 0;
    const userProg = progressMap[courseId];
    const completed = userProg?.completedLessons?.length || 0;
    return Math.round((completed / totalLessons) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">All Courses</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <Link key={c.id} to={`/courses/${c.id}`}> 
              <CourseCard course={c} progress={getCourseProgress(c.id)} />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
