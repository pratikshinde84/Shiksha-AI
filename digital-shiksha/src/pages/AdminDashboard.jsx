// src/pages/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { COURSES } from '../data/courses';

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: COURSES.length,
    totalCertificates: 0,
    totalMessages: 0,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Use storageService with correct versioned keys
    const storedUsers = storageService.getUsers();
    const allCerts = storageService.getCertificates(); // { [userId]: [] }
    const totalCerts = Object.values(allCerts).reduce((sum, arr) => sum + arr.length, 0);
    const messages = storageService.get('v1:digitalShiksha_contactMessages') || [];

    setStats({
      totalUsers: storedUsers.length,
      totalCourses: COURSES.length,
      totalCertificates: totalCerts,
      totalMessages: messages.length,
    });
    setUsers(storedUsers);
  }, [user]);

  const statCards = [
    { label: 'Registered Users', value: stats.totalUsers, icon: '👤', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'Total Courses', value: stats.totalCourses, icon: '📚', color: 'bg-green-50 border-green-200 text-green-700' },
    { label: 'Certificates Issued', value: stats.totalCertificates, icon: '🎓', color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { label: 'Contact Messages', value: stats.totalMessages, icon: '✉️', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Platform overview — data is stored locally in this browser.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className={`rounded-xl border p-5 ${s.color}`}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-xs mt-1 opacity-80">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Course list */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">All Courses</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wide">
                  <th className="pb-2 pr-4">Course</th>
                  <th className="pb-2 pr-4">Category</th>
                  <th className="pb-2 pr-4">Difficulty</th>
                  <th className="pb-2">Lessons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {COURSES.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span>{course.icon}</span>
                        <span className="font-medium text-gray-800">{course.title}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-gray-500 capitalize">{course.category}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        course.difficulty === 'Beginner'
                          ? 'bg-green-100 text-green-700'
                          : course.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {course.difficulty}
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-600">{course.lessons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Registered Users
            <span className="ml-2 text-sm font-normal text-gray-400">({users.length})</span>
          </h2>
          {users.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">No users registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-gray-500 uppercase tracking-wide">
                    <th className="pb-2 pr-4">Name</th>
                    <th className="pb-2 pr-4">Username</th>
                    <th className="pb-2 pr-4">Language</th>
                    <th className="pb-2">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="py-2.5 pr-4 font-medium text-gray-800">{u.fullName}</td>
                      <td className="py-2.5 pr-4 text-gray-500">{u.username}</td>
                      <td className="py-2.5 pr-4">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          {u.language || 'en'}
                        </span>
                      </td>
                      <td className="py-2.5 text-gray-500">{u.grade || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
