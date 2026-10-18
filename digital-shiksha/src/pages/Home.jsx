// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { COURSES } from '../data/courses';

export const Home = () => {
  const featuredCourses = COURSES.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero — solid gradient BG, plain white text */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-text text-4xl md:text-5xl font-bold mb-5 text-white leading-tight">
            Empowering Rural Students Through Digital Education
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
            Learn essential digital skills anytime, anywhere. From computer basics to internet
            safety, start your digital journey with free, easy-to-understand lessons.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-primary" style={{ background: 'white', color: '#2563EB', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              Get Started Free
            </Link>
            <Link to="/about" className="btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Why Digital Literacy Matters */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Why Digital Literacy Matters</h2>
            <p className="text-gray-700">
              In today's world, digital skills open doors to education, employment, and access
              to government services. Rural communities can bridge the gap and participate
              fully in the digital economy.
            </p>
            <ul className="space-y-2">
              {[
                'Improved job prospects',
                'Access to online education',
                'Safer online transactions',
                'Better connection with government services',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-700">
                  <span className="text-secondary font-bold mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/courses" className="btn-primary inline-flex mt-2">
              Browse Courses
            </Link>
          </div>
          <div className="flex justify-center">
            {/* Decorative placeholder — /images/illustration-1.svg doesn't exist */}
            <div className="w-72 h-72 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-8xl">
              📚
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-gray-50 py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Featured Digital Literacy Courses
            </h2>
            <p className="text-gray-600">
              Start with these beginner-friendly modules designed for rural learners.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className={`card-hover rounded-xl border ${course.borderColor} ${course.bgColor} p-5 flex flex-col`}
              >
                <div className="text-3xl mb-3">{course.icon}</div>
                <h3 className={`font-semibold text-sm mb-2 ${course.textColor}`}>
                  {course.title}
                </h3>
                <p className="text-xs text-gray-600 flex-1 line-clamp-3 mb-4">
                  {course.description}
                </p>
                <Link
                  to="/register"
                  className="btn-primary text-xs self-start"
                >
                  Start Learning
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/courses" className="btn-outline">
              View All 8 Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '8', label: 'Courses' },
            { value: '3', label: 'Languages' },
            { value: '100%', label: 'Free' },
            { value: '∞', label: 'Learners' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary text-white text-center px-6">
        <h2 className="text-3xl font-bold mb-3">Ready to start your digital journey?</h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          Join thousands of students learning digital skills for free.
        </p>
        <Link
          to="/register"
          className="btn-outline border-white text-white hover:bg-white hover:text-primary transition"
        >
          Join for Free
        </Link>
      </section>

      <Footer />
    </div>
  );
};
