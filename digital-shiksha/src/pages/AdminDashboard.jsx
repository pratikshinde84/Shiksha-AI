// src/pages/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { progressService } from '../services/progressService';

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, totalCertificates: 0 });

  useEffect(() => {
    // Placeholder: In a real app, fetch admin stats from backend.
    // Here we compute simple stats from local storage services.
    if (user) {
      const users = JSON.parse(localStorage.getItem('digitalShiksha_users') || '[]');
      const courses = JSON.parse(localStorage.getItem('digitalShiksha_courses') || '[]');
      const certs = JSON.parse(localStorage.getItem('digitalShiksha_certificates') || '[]');
      setStats({ totalUsers: users.length, totalCourses: courses.length, totalCertificates: certs.length });
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-2xl mt-2">{stats.totalUsers}</p>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">Total Courses</h2>
            <p className="text-2xl mt-2">{stats.totalCourses}</p>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">Certificates Issued</h2>
            <p className="text-2xl mt-2">{stats.totalCertificates}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
