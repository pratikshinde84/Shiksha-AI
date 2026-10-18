// src/services/storageService.js
/**
 * Centralized LocalStorage utility for Digital Shiksha.
 * Provides versioned data structures, safe JSON parsing, and namespaced keys.
 */

const VERSION = 'v1';

const KEYS = {
    USERS: `${VERSION}:digitalShiksha_users`,
    CURRENT_USER: `${VERSION}:digitalShiksha_currentUser`,
    COURSES: `${VERSION}:digitalShiksha_courses`,
    LESSONS: `${VERSION}:digitalShiksha_lessons`,
    QUIZZES: `${VERSION}:digitalShiksha_quizzes`,
    PROGRESS: `${VERSION}:digitalShiksha_progress`,
    ATTEMPTS: `${VERSION}:digitalShiksha_attempts`,
    CERTIFICATES: `${VERSION}:digitalShiksha_certificates`,
    LANGUAGE: `${VERSION}:digitalShiksha_language`,
    SETTINGS: `${VERSION}:digitalShiksha_settings`
};

function safeParse(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        console.warn('Corrupted LocalStorage data:', value);
        return null;
    }
}

export const storageService = {
    // Generic getters/setters
    get(key) {
        const raw = localStorage.getItem(key);
        return raw ? safeParse(raw) : null;
    },
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    remove(key) {
        localStorage.removeItem(key);
    },

    // Users
    getUsers() { return this.get(KEYS.USERS) || []; },
    setUsers(users) { this.set(KEYS.USERS, users); },

    // Current session user
    getCurrentUser() { return this.get(KEYS.CURRENT_USER); },
    setCurrentUser(user) { this.set(KEYS.CURRENT_USER, user); },

    // Courses
    getCourses() { return this.get(KEYS.COURSES) || []; },
    setCourses(courses) { this.set(KEYS.COURSES, courses); },

    // Lessons — stored as { [courseId]: Lesson[] }
    // getLessons() with no arg returns the whole map (used internally)
    // getLessonsForCourse(courseId) returns an array for a specific course
    getLessons() { return this.get(KEYS.LESSONS) || {}; },
    getLessonsForCourse(courseId) {
        const all = this.getLessons();
        return all[courseId] || [];
    },
    setLessons(lessons) { this.set(KEYS.LESSONS, lessons); },
    setLessonsForCourse(courseId, lessonArray) {
        const all = this.getLessons();
        all[courseId] = lessonArray;
        this.setLessons(all);
    },

    // Quizzes — stored as { [courseId]: Quiz[] }
    getQuizzes() { return this.get(KEYS.QUIZZES) || {}; },
    getQuizzesForCourse(courseId) {
        const all = this.getQuizzes();
        return all[courseId] || [];
    },
    setQuizzes(quizzes) { this.set(KEYS.QUIZZES, quizzes); },
    setQuizzesForCourse(courseId, quizArray) {
        const all = this.getQuizzes();
        all[courseId] = quizArray;
        this.setQuizzes(all);
    },

    // Progress
    getProgress() { return this.get(KEYS.PROGRESS) || {}; },
    setProgress(progress) { this.set(KEYS.PROGRESS, progress); },

    // Attempts
    getAttempts() { return this.get(KEYS.ATTEMPTS) || {}; },
    setAttempts(attempts) { this.set(KEYS.ATTEMPTS, attempts); },

    // Certificates — stored as { [userId]: Certificate[] }
    getCertificates() { return this.get(KEYS.CERTIFICATES) || {}; },
    getCertificatesForUser(userId) {
        const all = this.getCertificates();
        return all[userId] || [];
    },
    setCertificates(certs) { this.set(KEYS.CERTIFICATES, certs); },
    setCertificatesForUser(userId, certArray) {
        const all = this.getCertificates();
        all[userId] = certArray;
        this.setCertificates(all);
    },

    // Language preference
    getLanguage() { return this.get(KEYS.LANGUAGE) || 'en'; },
    setLanguage(lang) { this.set(KEYS.LANGUAGE, lang); },

    // App settings
    getSettings() { return this.get(KEYS.SETTINGS) || {}; },
    setSettings(settings) { this.set(KEYS.SETTINGS, settings); },

    // Expose keys for other modules
    KEYS
};
