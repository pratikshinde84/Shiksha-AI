// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { progressService } from '../services/progressService';
import { storageService } from '../services/storageService';
import { COURSES } from '../data/courses';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const BAR_COLORS = ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#6366F1', '#EC4899'];

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [chartData, setChartData] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalCourses] = useState(COURSES.length);
  const [enrolledCount, setEnrolledCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const userProgress = progressService.getUserProgress(user.id);

    // Build chart data from real COURSES list
    const data = COURSES.map((course) => {
      const prog = userProgress[course.id] || { completedLessons: [] };
      return {
        name: course.title.split(' ').slice(0, 2).join(' '), // short label
        completed: prog.completedLessons?.length || 0,
        total: course.lessons,
        icon: course.icon,
      };
    }).filter((d) => d.completed > 0 || d.total > 0);

    setChartData(data);
    setEnrolledCount(Object.keys(userProgress).length);
    setTotalCompleted(
      Object.values(userProgress).filter(
        (p) => p.completedLessons?.length > 0
      ).length
    );
  }, [user]);

  const statCards = [
    { label: 'Courses Available', value: totalCourses, icon: '📚', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700' },
    { label: 'Enrolled In', value: enrolledCount, icon: '🎯', color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700' },
    { label: 'In Progress', value: totalCompleted, icon: '⚡', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-700' },
    { label: 'Completed', value: 0, icon: '🏆', color: 'bg-green-50 border-green-200', textColor: 'text-green-700' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 page-content">

        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold mb-1">
            Welcome back, {user?.name || 'Learner'}! 👋
          </h1>
          <p className="text-white/80 text-sm">
            Keep up the great work — your digital skills are growing every day.
          </p>
          <Link to="/courses" className="mt-4 inline-block bg-white text-primary font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/90 transition">
            Continue Learning →
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className={`rounded-xl border p-4 ${s.color}`}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className={`text-2xl font-bold ${s.textColor}`}>{s.value}</p>
              <p className="text-xs text-gray-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Progress chart */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Lesson Progress by Course</h2>
            {chartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <span className="text-4xl mb-2">📊</span>
                <p className="text-sm">No progress yet.</p>
                <Link to="/courses" className="mt-3 btn-primary text-xs">Start a Course</Link>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value, name) => [value, name === 'completed' ? 'Completed' : 'Total']}
                  />
                  <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { to: '/courses', label: 'Browse All Courses', icon: '📚', desc: '8 courses available' },
                { to: '/certificates', label: 'My Certificates', icon: '🎓', desc: 'Download your achievements' },
                { to: '/practice', label: 'Practice Zone', icon: '🧪', desc: 'Sharpen your skills' },
                { to: '/contact', label: 'Get Help', icon: '💬', desc: 'Contact support' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary hover:bg-blue-50 transition group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-primary">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span className="text-gray-400 group-hover:text-primary text-sm">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* All courses progress list */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">All Courses</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COURSES.map((course) => {
              const prog = progressService.getUserProgress(user?.id || '')[course.id] || { completedLessons: [] };
              const pct = Math.round((prog.completedLessons.length / course.lessons) * 100);
              return (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className={`rounded-xl border ${course.borderColor} ${course.bgColor} p-3 hover:shadow-md transition`}
                >
                  <div className="text-2xl mb-1">{course.icon}</div>
                  <p className={`text-xs font-semibold ${course.textColor} mb-2 line-clamp-2`}>{course.title}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{pct}% done</p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
