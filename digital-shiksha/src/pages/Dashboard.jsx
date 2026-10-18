// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { progressService } from '../services/progressService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      const userProgress = progressService.getUserProgress(user.id);
      // Transform progress into chart data format
      const chartData = Object.entries(userProgress).map(([courseId, prog]) => ({
        name: `Course ${courseId}`,
        completed: prog.completedLessons?.length || 0,
        total: prog.totalLessons || 0,
      }));
      setData(chartData);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Student Dashboard</h1>
        {data.length === 0 ? (
          <p className="text-gray-600">No progress data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed Lessons" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </main>
      <Footer />
    </div>
  );
};
