// src/pages/Certificates.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { certificateService } from '../services/certificateService';

export const Certificates = () => {
  const { user } = useContext(AuthContext);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    if (user) {
      // getCertificates now accepts userId
      const userCerts = certificateService.getCertificates(user.id);
      setCerts(userCerts);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">My Certificates</h1>
        {certs.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">🎓</div>
            <p className="text-lg font-medium">No certificates earned yet.</p>
            <p className="text-sm mt-2">Complete a course to earn your first certificate!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {certs.map((c) => (
              <li
                key={c.id}
                className="border border-gray-200 p-5 rounded-xl shadow-sm flex items-center justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-primary">{c.courseTitle}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Issued on {c.date}</p>
                  <p className="text-xs text-gray-400 mt-0.5">ID: {c.id}</p>
                </div>
                <button
                  className="btn-primary text-sm ml-4 shrink-0"
                  onClick={() => certificateService.downloadCertificate(user.id, c.id)}
                >
                  Download PDF
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};
