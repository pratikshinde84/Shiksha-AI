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
      const userCerts = certificateService.getCertificates(user.id);
      setCerts(userCerts);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Certificates</h1>
        {certs.length === 0 ? (
          <p className="text-gray-600">No certificates earned yet.</p>
        ) : (
          <ul className="space-y-4">
            {certs.map((c) => (
              <li key={c.id} className="border p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <p className="text-sm text-gray-500">Issued on {c.date}</p>
                <button
                  className="mt-2 btn-primary"
                  onClick={() => certificateService.downloadCertificate(c.id)}
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
