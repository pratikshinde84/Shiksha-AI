// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
// import removed due to missing icon

/**
 * Home page – hero banner + informational sections.
 * Uses Tailwind utilities and custom gradient text.
 */
export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-text text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Empowering Rural Students Through Digital Education
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Learn essential digital skills anytime, anywhere. From computer basics to internet safety, start your digital journey with free, easy-to-understand lessons.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/courses" className="btn-primary">
              Start Learning
            </Link>
            <Link to="/about" className="btn-outline">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Why Digital Literacy Matters */}
      <section className="py-16 px-4 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Why Digital Literacy Matters</h2>
            <p className="text-gray-700">In today’s world, digital skills open doors to education, employment, and access to government services. Rural communities can bridge the gap and participate fully in the digital economy.</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Improved job prospects</li>
              <li>Access to online education</li>
              <li>Safer online transactions</li>
              <li>Better connection with government services</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <img src="/images/illustration-1.svg" alt="Students learning" className="w-80 h-auto animate-float" />
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-gray-50 py-16 px-4 md:px-12">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Featured Digital Literacy Courses</h2>
          <p className="text-gray-600">Start with these beginner-friendly modules designed for rural learners.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder cards – real data will be loaded from COURSES */}
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex flex-col h-64">
              <div className="flex-1">
                <h3 className="font-medium text-primary mb-2">Course {i}</h3>
                <p className="text-sm text-gray-600">Brief description of the course content.</p>
              </div>
              <Link to="/courses" className="mt-2 btn-primary text-sm self-start">Explore</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start your digital journey?</h2>
        <Link to="/register" className="btn-outline text-white border-white hover:bg-white hover:text-primary transition">
          Join for Free
        </Link>
      </section>

      <Footer />
    </div>
  );
};
