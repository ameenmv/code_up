import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  // Since we have a proxy configured in vite.config.js,
  // we can just use the relative URL '/api'
  baseURL: '/api',
  withCredentials: true, // Important for session-based auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth Endpoints
export const authService = {
  register: (data) => api.post('/auth/register', data).then(res => res.data),
  login: (data) => api.post('/auth/login', data).then(res => res.data),
  logout: () => api.post('/auth/logout').then(res => res.data),
  getCurrentUser: () => api.get('/auth/me').then(res => res.data),
};

// Courses Endpoints
export const coursesService = {
  getAllCourses: (params) => api.get('/courses/', { params }).then(res => res.data),
  getCourseDetails: (id) => api.get(`/courses/${id}`).then(res => res.data),
  enrollCourse: (id) => api.post(`/courses/${id}/enroll`).then(res => res.data),
  getLesson: (courseId, lessonId) => api.get(`/courses/${courseId}/lessons/${lessonId}`).then(res => res.data),
  markLessonComplete: (courseId, lessonId) => api.post(`/courses/${courseId}/lessons/${lessonId}/complete`).then(res => res.data),
  getCategories: () => api.get('/courses/categories').then(res => res.data),
};

// Quizzes Endpoints
export const quizzesService = {
  getCourseQuizzes: (courseId) => api.get(`/quizzes/course/${courseId}`).then(res => res.data),
  getQuizDetails: (id) => api.get(`/quizzes/${id}`).then(res => res.data),
  submitQuiz: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers }).then(res => res.data),
};

// Certificates Endpoints
export const certificatesService = {
  getMyCertificates: () => api.get('/certificates/my').then(res => res.data),
  verifyCertificate: (code) => api.get(`/certificates/verify/${code}`).then(res => res.data),
};

// Profile Endpoints
export const profileService = {
  getProfile: () => api.get('/profile/').then(res => res.data),
  updateProfile: (data) => api.put('/profile/', data).then(res => res.data),
};

// Analytics Endpoints (Admin)
export const analyticsService = {
  getOverview: () => api.get('/analytics/overview').then(res => res.data),
  getHardestCourses: () => api.get('/analytics/hardest-courses').then(res => res.data),
  getCompletionTime: () => api.get('/analytics/completion-time').then(res => res.data),
};

export default api;
