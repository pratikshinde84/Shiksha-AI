// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const objectives = [
  'Teach fundamental computer concepts and safe internet practices.',
  'Introduce digital payment methods and cybersecurity awareness.',
  'Provide hands-on practice simulations for real-world scenarios.',
  'Offer multilingual support in English, Hindi, and Marathi.',
];

const team = [
  { name: 'Digital Literacy Team', role: 'Course Design & Content', emoji: '📝' },
  { name: 'Tech & Accessibility', role: 'Platform Development', emoji: '💻' },
  { name: 'Community Partners', role: 'Rural Outreach', emoji: '🤝' },
];

export const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">About Digital Shiksha</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Bridging the digital divide for rural students across India — one lesson at a time.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Problem + Mission */}
        <section className="py-14 px-4 md:px-12">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="text-4xl mb-3">❓</div>
              <h2 className="text-xl font-bold text-red-700 mb-2">The Problem</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Many rural students in India lack access to basic digital literacy education,
                limiting their opportunities for higher education, employment, and accessing
                essential government services.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h2 className="text-xl font-bold text-green-700 mb-2">Our Mission</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                To provide free, engaging, and beginner-friendly digital education that
                empowers rural learners to confidently use computers, the internet, and
                digital tools — regardless of their location.
              </p>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-12 px-4 md:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Our Objectives</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <span className="text-primary font-bold text-lg mt-0.5">0{i + 1}</span>
                  <p className="text-gray-700 text-sm">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-12 px-4 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">Who Is This For?</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { emoji: '🧑‍🎓', title: 'Secondary Students', desc: 'Class 8–12 students in rural schools' },
                { emoji: '👩‍🌾', title: 'Adult Learners', desc: 'Adults with no prior digital exposure' },
                { emoji: '🏫', title: 'Learning Centers', desc: 'Community centers and NGO partners' },
              ].map((item) => (
                <div key={item.title} className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <div className="text-5xl mb-3">{item.emoji}</div>
                  <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-12 px-4 md:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">The Team</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {team.map((member) => (
                <div key={member.name} className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
                  <div className="text-4xl mb-3">{member.emoji}</div>
                  <h3 className="font-semibold text-gray-800 text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Ready to learn with us?</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
            Join Digital Shiksha and start building your digital skills today — completely free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-primary">Get Started Free</Link>
            <Link to="/courses" className="btn-outline">View Courses</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
