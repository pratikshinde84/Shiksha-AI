// src/components/QuizQuestion.jsx
import React, { useState } from 'react';

/**
 * QuizQuestion renders a single MCQ with options and feedback.
 * Props:
 *   question: { id, text, options: [{id, text, isCorrect}], explanation }
 *   onAnswer: (questionId, selectedOptionId, isCorrect) => void
 */
export const QuizQuestion = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (optId) => {
    if (!submitted) setSelected(optId);
  };

  const handleSubmit = () => {
    if (selected == null) return;
    const isCorrect = question.options.find((o) => o.id === selected)?.isCorrect ?? false;
    setSubmitted(true);
    onAnswer(question.id, selected, isCorrect);
  };

  const getOptionClass = (opt) => {
    const base = 'flex items-center p-3 rounded-lg cursor-pointer border transition-colors';
    if (!submitted) {
      return `${base} ${
        selected === opt.id
          ? 'border-primary bg-blue-50'   // selected but not yet submitted
          : 'border-gray-200 bg-gray-50 hover:border-primary hover:bg-blue-50'
      }`;
    }
    // After submission: show correct in green, wrong selection in red
    if (opt.isCorrect) return `${base} border-green-500 bg-green-50`;
    if (selected === opt.id && !opt.isCorrect) return `${base} border-red-400 bg-red-50`;
    return `${base} border-gray-200 bg-gray-50 opacity-60`;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <p className="font-semibold text-gray-800 mb-4 text-base">{question.text}</p>
      <ul className="space-y-2">
        {question.options.map((opt) => (
          <li key={opt.id}>
            <label className={getOptionClass(opt)}>
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => handleSelect(opt.id)}
                disabled={submitted}
                className="mr-3 accent-primary"
              />
              <span className="text-sm text-gray-700">{opt.text}</span>
            </label>
          </li>
        ))}
      </ul>

      {!submitted && (
        <button
          className="mt-5 btn-primary"
          onClick={handleSubmit}
          disabled={selected == null}
        >
          Submit Answer
        </button>
      )}

      {submitted && (
        <div className={`mt-4 p-3 rounded-lg ${
          question.options.find((o) => o.id === selected)?.isCorrect
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          {question.options.find((o) => o.id === selected)?.isCorrect ? (
            <p className="text-green-700 font-semibold">✓ Correct!</p>
          ) : (
            <p className="text-red-700 font-semibold">✗ Incorrect</p>
          )}
          {question.explanation && (
            <p className="mt-1 text-sm text-gray-700">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};
