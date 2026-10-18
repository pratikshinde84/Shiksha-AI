// src/pages/About.jsx
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/**
 * About page – project introduction, mission, vision, target audience.
 */
export const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">About Digital Shiksha</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Problem Statement</h2>
          <p className="text-gray-700">Many rural students in India lack access to basic digital literacy education, limiting their opportunities for higher education, employment, and accessing essential government services.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Mission & Vision</h2>
          <p className="text-gray-700">Our mission is to provide free, engaging, and beginner‑friendly digital education that empowers rural learners to confidently use computers, the internet, and digital tools. We envision a future where every student, regardless of location, can participate fully in the digital economy.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Objectives</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Teach fundamental computer concepts and safe internet practices.</li>
            <li>Introduce digital payment methods and cybersecurity awareness.</li>
            <li>Provide hands‑on practice simulations for real‑world scenarios.</li>
            <li>Offer multilingual support in English, Hindi, and Marathi.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Target Audience</h2>
          <p className="text-gray-700">Students in secondary schools, community learning centers, and adult learners in rural areas who have limited or no prior exposure to digital technologies.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
