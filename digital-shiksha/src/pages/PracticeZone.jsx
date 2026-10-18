// src/pages/PracticeZone.jsx
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PracticeZone = () => (
  <div className="flex flex-col min-h-screen bg-white">
    <Navbar />
    <main className="flex-1 max-w-4xl mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Practice Zone</h1>
      <p className="text-gray-700">Here you will find interactive simulations and practice exercises to reinforce your learning. (Content to be added.)</p>
    </main>
    <Footer />
  </div>
);
