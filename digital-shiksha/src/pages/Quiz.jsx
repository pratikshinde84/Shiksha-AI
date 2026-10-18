// src/pages/Quiz.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { progressService } from '../services/progressService';
import { AuthContext } from '../context/AuthContext';
import { QuizQuestion } from '../components/QuizQuestion';
import { LESSONS } from '../data/lessons';

// Derive quizzes from lesson data so there is always something to load
function buildQuizzesFromLessons(courseId) {
  const lessons = LESSONS[courseId] || [];
  return lessons
    .filter((l) => l.quizId)
    .map((l) => ({
      id: l.quizId,
      lessonId: l.id,
      // Placeholder questions — real data can be extended in lessons.js
      questions: [
        {
          id: `${l.quizId}-q1`,
          text: `Quick check: What is the main topic of "${l.title}"?`,
          options: [
            { id: 'a', text: l.title, isCorrect: true },
            { id: 'b', text: 'Digital Payments', isCorrect: false },
            { id: 'c', text: 'Email Safety', isCorrect: false },
            { id: 'd', text: 'None of the above', isCorrect: false },
          ],
          explanation: `The lesson is specifically about ${l.title}.`,
        },
      ],
    }));
}

export const Quiz = () => {
  const { courseId, quizId } = useParams();
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const quizzes = buildQuizzesFromLessons(courseId);
    // quizId may be the courseId itself (from CourseDetails "Take Quiz") — show all questions
    let quiz;
    if (quizId === courseId) {
      // Aggregate all questions from all quizzes of this course
      const allQuestions = quizzes.flatMap((q) => q.questions);
      setQuestions(allQuestions);
      return;
    }
    quiz = quizzes.find((q) => q.id === quizId);
    if (quiz) setQuestions(quiz.questions);
  }, [courseId, quizId]);

  // QuizQuestion calls onAnswer(questionId, selectedOptionId, isCorrect)
  // We only need isCorrect (3rd arg)
  const handleAnswer = (_questionId, _selectedId, isCorrect) => {
    const newScore = score + (isCorrect ? 1 : 0);
    if (currentIdx + 1 < questions.length) {
      setScore(newScore);
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCompleted(true);
      setScore(newScore);
      if (user) {
        progressService.recordQuizScore(user.id, courseId, quizId, newScore);
      }
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-gray-600">Quiz not found for this course.</p>
          <Link to={`/courses/${courseId}`} className="btn-outline">
            Back to Course
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 page-content-sm">
        {completed ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="text-7xl mb-5">🎉</div>
            <h2 className="text-3xl font-bold text-primary mb-3">Quiz Completed!</h2>
            <p className="text-lg text-gray-700 mb-8">
              Your score:{' '}
              <span className="font-bold text-primary text-2xl">{score}</span>
              <span className="text-gray-500"> / {questions.length}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={`/courses/${courseId}`} className="btn-outline">Back to Course</Link>
              <Link to="/courses" className="btn-primary">Browse More Courses</Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-primary">Quiz</h1>
              <span className="text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full">
                {currentIdx + 1} / {questions.length}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentIdx / questions.length) * 100}%` }}
              />
            </div>
            <QuizQuestion question={questions[currentIdx]} onAnswer={handleAnswer} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
