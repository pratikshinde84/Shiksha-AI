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
    const isCorrect = question.options.find(o => o.id === selected).isCorrect;
    setSubmitted(true);
    onAnswer(question.id, selected, isCorrect);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border">
      <p className="font-medium mb-3">{question.text}</p>
      <ul className="space-y-2">
        {question.options.map((opt) => (
          <li key={opt.id}>
            <label className={`flex items-center p-2 rounded cursor-pointer ${selected === opt.id ? 'bg-primary-light' : 'bg-gray-50'} ${submitted && opt.isCorrect ? 'border-2 border-green-500' : ''}`}> 
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={selected === opt.id}
                onChange={() => handleSelect(opt.id)}
                disabled={submitted}
                className="mr-2"
              />
              {opt.text}
            </label>
          </li>
        ))}
      </ul>
      {!submitted && (
        <button className="mt-4 btn-primary" onClick={handleSubmit} disabled={selected == null}>Submit</button>
      )}
      {submitted && (
        <div className="mt-4 p-3 rounded bg-gray-100">
          {question.options.find(o => o.id === selected).isCorrect ? (
            <p className="text-green-600 font-medium">Correct! 🎉</p>
          ) : (
            <p className="text-red-600 font-medium">Incorrect.</p>
          )}
          {question.explanation && <p className="mt-2 text-sm text-gray-700">{question.explanation}</p>}
        </div>
      )}
    </div>
  );
};
