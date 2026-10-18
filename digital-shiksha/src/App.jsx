// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProtectedDemoRoute } from './components/ProtectedDemoRoute';
import { AIChatbot } from './components/AIChatbot';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { LessonPlayer } from './pages/LessonPlayer';
import { Quiz } from './pages/Quiz';
import { PracticeZone } from './pages/PracticeZone';
import { Certificates } from './pages/Certificates';
import { AdminDashboard } from './pages/AdminDashboard';

export const App = () => (
  <AuthProvider>
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedDemoRoute>
                <Dashboard />
              </ProtectedDemoRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedDemoRoute>
                <Courses />
              </ProtectedDemoRoute>
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <ProtectedDemoRoute>
                <CourseDetails />
              </ProtectedDemoRoute>
            }
          />
          <Route
            path="/courses/:courseId/lesson/:lessonId"
            element={
              <ProtectedDemoRoute>
                <LessonPlayer />
              </ProtectedDemoRoute>
            }
          />
          <Route
            path="/courses/:courseId/quiz/:quizId"
            element={
              <ProtectedDemoRoute>
                <Quiz />
              </ProtectedDemoRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedDemoRoute>
                <PracticeZone />
              </ProtectedDemoRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedDemoRoute>
                <Certificates />
              </ProtectedDemoRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedDemoRoute>
                <AdminDashboard />
              </ProtectedDemoRoute>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
        <AIChatbot />
      </Router>
    </LanguageProvider>
  </AuthProvider>
);

export default App;
