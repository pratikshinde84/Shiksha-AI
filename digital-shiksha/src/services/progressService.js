// src/services/progressService.js
/**
 * Helper functions to read/write student progress in LocalStorage.
 * Progress structure:
 * {
 *   [userId]: {
 *     [courseId]: {
 *       completedLessons: Set<string>,
 *       quizScores: { [quizId]: number }
 *     }
 *   }
 * }
 */
import { storageService } from './storageService';

export const progressService = {
    getUserProgress(userId) {
        const all = storageService.getProgress();
        return all[userId] || {};
    },
    setUserProgress(userId, progress) {
        const all = storageService.getProgress();
        all[userId] = progress;
        storageService.setProgress(all);
    },
    // Mark a lesson as completed
    completeLesson(userId, courseId, lessonId) {
        const userProg = this.getUserProgress(userId);
        const courseProg = userProg[courseId] || { completedLessons: [], quizScores: {} };
        if (!courseProg.completedLessons.includes(lessonId)) {
            courseProg.completedLessons.push(lessonId);
        }
        userProg[courseId] = courseProg;
        this.setUserProgress(userId, userProg);
    },
    // Record quiz score
    recordQuizScore(userId, courseId, quizId, score) {
        const userProg = this.getUserProgress(userId);
        const courseProg = userProg[courseId] || { completedLessons: [], quizScores: {} };
        courseProg.quizScores[quizId] = score;
        userProg[courseId] = courseProg;
        this.setUserProgress(userId, userProg);
    },
    // Compute overall progress percentage for a course
    getCourseProgress(userId, courseId, totalLessons) {
        const userProg = this.getUserProgress(userId);
        const courseProg = userProg[courseId];
        if (!courseProg) return 0;
        const completed = courseProg.completedLessons.length;
        return Math.round((completed / totalLessons) * 100);
    }
};
