// src/pages/Courses.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CourseCard } from '../components/CourseCard';
import { storageService } from '../services/storageService';
import { progressService } from '../services/progressService';
import { AuthContext } from '../context/AuthContext';
// Static import — no CommonJS require() in ESM modules
import { COURSES as DEFAULT_COURSES } from '../data/courses';

export const Courses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    // Seed courses into storage if not present yet
    let stored = storageService.getCourses();
    if (stored.length === 0) {
      storageService.setCourses(DEFAULT_COURSES);
      stored = DEFAULT_COURSES;
    }
    setCourses(stored);
    if (user) {
      const userProg = progressService.getUserProgress(user.id);
      setProgressMap(userProg);
    }
  }, [user]);

  const getCourseProgress = (courseId, totalLessons) => {
    if (!totalLessons) return 0;
    const userProg = progressMap[courseId];
    const completed = userProg?.completedLessons?.length || 0;
    return Math.round((completed / totalLessons) * 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 page-content">
        <h1 className="text-3xl font-bold text-primary mb-8">All Courses</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              progress={getCourseProgress(c.id, c.lessons)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
