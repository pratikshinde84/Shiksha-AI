// src/pages/Quiz.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { storageService } from '../services/storageService';
import { progressService } from '../services/progressService';
import { AuthContext } from '../context/AuthContext';
import { QuizQuestion } from '../components/QuizQuestion';

export const Quiz = () => {
  const { courseId, quizId } = useParams();
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const quizzes = storageService.getQuizzes(courseId);
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) setQuestions(quiz.questions);
  }, [courseId, quizId]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(prev => prev + 1);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCompleted(true);
      if (user) {
        progressService.recordQuizScore(user.id, courseId, quizId, score + (isCorrect ? 1 : 0));
      }
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Quiz not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto p-4 py-8">
        {completed ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg">Your score: {score} / {questions.length}</p>
          </div>
        ) : (
          <QuizQuestion
            question={questions[currentIdx]}
            onAnswer={handleAnswer}
            questionNumber={currentIdx + 1}
            total={questions.length}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
