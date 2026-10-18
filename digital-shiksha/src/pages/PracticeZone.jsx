// src/pages/PracticeZone.jsx
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// ─── Mini-exercises ───────────────────────────────────────────────────────────

const TYPING_SENTENCES = [
  'The quick brown fox jumps over the lazy dog.',
  'Digital literacy opens doors to a better future.',
  'Practice makes perfect — keep learning every day.',
];

const URL_QUIZ = [
  { url: 'https://www.google.com', safe: true },
  { url: 'http://g00gle-login.xyz/verify', safe: false },
  { url: 'https://www.india.gov.in', safe: true },
  { url: 'http://free-prize-claim.tk', safe: false },
];

// ─── Typing Practice ─────────────────────────────────────────────────────────
const TypingPractice = () => {
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);

  const target = TYPING_SENTENCES[sentenceIdx];
  const correct = typed === target;

  const handleChange = (e) => {
    setTyped(e.target.value);
    if (e.target.value === target) setDone(true);
  };

  const next = () => {
    setSentenceIdx((i) => (i + 1) % TYPING_SENTENCES.length);
    setTyped('');
    setDone(false);
  };

  // Colour each character green/red as the user types
  const chars = target.split('').map((ch, i) => {
    if (i >= typed.length) return <span key={i} className="text-gray-400">{ch}</span>;
    return (
      <span key={i} className={typed[i] === ch ? 'text-green-600' : 'text-red-500'}>
        {ch}
      </span>
    );
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">⌨️ Typing Practice</h3>
      <p className="text-xs text-gray-500 mb-4">Type the sentence below exactly as shown.</p>
      <div className="font-mono text-base bg-gray-50 rounded-lg p-3 mb-3 leading-relaxed tracking-wide">
        {chars}
      </div>
      <textarea
        rows={2}
        value={typed}
        onChange={handleChange}
        disabled={done}
        placeholder="Start typing here…"
        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />
      {done && (
        <div className="mt-3 flex items-center gap-3">
          <span className="text-green-600 font-semibold text-sm">✓ Perfect!</span>
          <button onClick={next} className="btn-primary text-xs">Next sentence →</button>
        </div>
      )}
      {!done && typed.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          {typed.length}/{target.length} characters
        </p>
      )}
    </div>
  );
};

// ─── URL Safety Checker ───────────────────────────────────────────────────────
const URLSafetyQuiz = () => {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(null); // true/false/null
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = URL_QUIZ[idx];

  const answer = (userSaysSafe) => {
    const correct = userSaysSafe === current.safe;
    setAnswered(correct);
    if (correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= URL_QUIZ.length) {
      setFinished(true);
    } else {
      setIdx((i) => i + 1);
      setAnswered(null);
    }
  };

  const reset = () => { setIdx(0); setAnswered(null); setScore(0); setFinished(false); };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">🔗 URL Safety Quiz</h3>
      <p className="text-xs text-gray-500 mb-4">Is this website URL safe or suspicious?</p>

      {finished ? (
        <div className="text-center py-4">
          <p className="text-2xl font-bold text-primary mb-1">{score}/{URL_QUIZ.length}</p>
          <p className="text-sm text-gray-600 mb-4">
            {score === URL_QUIZ.length ? '🎉 Perfect score!' : score >= URL_QUIZ.length / 2 ? '👍 Good job!' : '📚 Keep practising!'}
          </p>
          <button onClick={reset} className="btn-primary text-sm">Try Again</button>
        </div>
      ) : (
        <>
          <div className="font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 break-all">
            {current.url}
          </div>
          {answered === null ? (
            <div className="flex gap-3">
              <button onClick={() => answer(true)} className="flex-1 btn-primary text-sm justify-center">
                ✅ Safe
              </button>
              <button onClick={() => answer(false)} className="flex-1 btn-outline text-sm justify-center border-red-400 text-red-600 hover:bg-red-50">
                ⚠️ Suspicious
              </button>
            </div>
          ) : (
            <div className={`p-3 rounded-lg mb-3 text-sm ${answered ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {answered ? '✓ Correct!' : `✗ Wrong — this URL is ${current.safe ? 'safe' : 'suspicious'}.`}
            </div>
          )}
          {answered !== null && (
            <button onClick={next} className="mt-2 btn-primary text-sm">
              {idx + 1 >= URL_QUIZ.length ? 'See Results' : 'Next URL →'}
            </button>
          )}
          <p className="text-xs text-gray-400 mt-3">{idx + 1}/{URL_QUIZ.length}</p>
        </>
      )}
    </div>
  );
};

// ─── Password Strength Meter ──────────────────────────────────────────────────
const PasswordStrength = () => {
  const [password, setPassword] = useState('');

  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'Contains uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Contains number', ok: /[0-9]/.test(password) },
    { label: 'Contains special character (!@#$…)', ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const strength = checks.filter((c) => c.ok).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-gray-200', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-1">🔒 Password Strength Checker</h3>
      <p className="text-xs text-gray-500 mb-4">Learn what makes a strong password.</p>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type a test password…"
        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-3"
      />
      {/* Strength bar */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${i <= strength ? colors[strength] : 'bg-gray-200'}`}
          />
        ))}
      </div>
      {password && (
        <p className={`text-xs font-semibold mb-3 ${['', 'text-red-600', 'text-yellow-600', 'text-blue-600', 'text-green-600'][strength]}`}>
          {labels[strength]}
        </p>
      )}
      <ul className="space-y-1">
        {checks.map((c) => (
          <li key={c.label} className={`flex items-center gap-2 text-xs ${c.ok ? 'text-green-600' : 'text-gray-500'}`}>
            <span>{c.ok ? '✓' : '○'}</span>
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const PracticeZone = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Practice Zone 🧪</h1>
        <p className="text-white/80 max-w-xl mx-auto text-sm">
          Reinforce your digital skills with interactive exercises. Practice typing, identify
          safe URLs, and learn to create strong passwords.
        </p>
      </section>

      <main className="flex-1 page-content">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TypingPractice />
          <URLSafetyQuiz />
          <PasswordStrength />
        </div>

        {/* Coming soon cards */}
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { emoji: '📧', title: 'Email Simulation', desc: 'Practice identifying phishing emails' },
            { emoji: '💳', title: 'UPI Payment Sim', desc: 'Safe digital payment walkthrough' },
            { emoji: '🏛️', title: 'Gov Portal Guide', desc: 'Navigate DigiLocker & Aadhaar' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-dashed border-gray-300 p-5 text-center opacity-60">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <h3 className="font-semibold text-gray-700 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              <span className="mt-3 inline-block text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
