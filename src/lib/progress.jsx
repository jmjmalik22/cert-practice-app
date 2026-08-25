// Progress tracking utilities - stores data in localStorage
// No backend required - works entirely client-side

import { safeGet, safeSet } from "./theme.jsx";

const PROGRESS_KEY = "fp_progress";
const USER_KEY = "fp_user";

// Default user profile
export function getDefaultUser() {
  return {
    name: "",
    email: "",
    createdAt: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
  };
}

// Get or create user profile
export function getUser() {
  return safeGet(USER_KEY, getDefaultUser());
}

// Save user profile
export function saveUser(user) {
  safeSet(USER_KEY, { ...user, lastVisit: new Date().toISOString() });
}

// Get all progress data
export function getProgress() {
  return safeGet(PROGRESS_KEY, {});
}

// Save progress for a specific exam
export function saveExamProgress(examCode, data) {
  const progress = getProgress();
  progress[examCode] = {
    ...progress[examCode],
    ...data,
    lastUpdated: new Date().toISOString(),
  };
  safeSet(PROGRESS_KEY, progress);
}

// Record a question attempt
export function recordAttempt(examCode, questionId, isCorrect, timeSpent = 0) {
  const progress = getProgress();
  if (!progress[examCode]) {
    progress[examCode] = {
      attempts: [],
      correct: 0,
      total: 0,
      bookmarked: [],
    };
  }

  const exam = progress[examCode];
  exam.attempts.push({
    questionId,
    isCorrect,
    timeSpent,
    timestamp: new Date().toISOString(),
  });

  exam.total += 1;
  if (isCorrect) exam.correct += 1;

  safeSet(PROGRESS_KEY, progress);
}

// Toggle bookmark for a question
export function toggleBookmark(examCode, questionId) {
  const progress = getProgress();
  if (!progress[examCode]) {
    progress[examCode] = { attempts: [], correct: 0, total: 0, bookmarked: [] };
  }

  const exam = progress[examCode];
  const index = exam.bookmarked.indexOf(questionId);

  if (index > -1) {
    exam.bookmarked.splice(index, 1);
  } else {
    exam.bookmarked.push(questionId);
  }

  safeSet(PROGRESS_KEY, progress);
  return index === -1; // returns true if bookmarked, false if removed
}

// Get bookmarked questions for an exam
export function getBookmarks(examCode) {
  const progress = getProgress();
  return progress[examCode]?.bookmarked || [];
}

// Calculate exam statistics
export function getExamStats(examCode, totalQuestions = 0) {
  const progress = getProgress();
  const exam = progress[examCode] || { attempts: [], correct: 0, total: 0, bookmarked: [] };

  const uniqueQuestions = new Set(exam.attempts.map((a) => a.questionId));
  const accuracy = exam.total > 0 ? Math.round((exam.correct / exam.total) * 100) : 0;
  const completion = totalQuestions > 0 ? Math.round((uniqueQuestions.size / totalQuestions) * 100) : 0;

  // Get weak areas (questions answered incorrectly multiple times)
  const weakAreas = {};
  exam.attempts.forEach((a) => {
    if (!a.isCorrect) {
      weakAreas[a.questionId] = (weakAreas[a.questionId] || 0) + 1;
    }
  });

  // Get last 7 days activity
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10);
  }).reverse();

  const dailyActivity = last7Days.map((date) => ({
    date,
    count: exam.attempts.filter((a) => a.timestamp?.startsWith(date)).length,
  }));

  return {
    totalAttempts: exam.total,
    correct: exam.correct,
    accuracy,
    uniqueQuestionsAnswered: uniqueQuestions.size,
    completion,
    bookmarked: exam.bookmarked.length,
    weakAreas: Object.entries(weakAreas)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id),
    dailyActivity,
    lastAttempt: exam.attempts[exam.attempts.length - 1]?.timestamp || null,
  };
}

// Get overall stats across all exams
export function getOverallStats() {
  const progress = getProgress();
  const exams = Object.keys(progress);

  let totalAttempts = 0;
  let totalCorrect = 0;
  let totalBookmarked = 0;
  let uniqueQuestions = new Set();

  exams.forEach((code) => {
    const exam = progress[code];
    totalAttempts += exam.total || 0;
    totalCorrect += exam.correct || 0;
    totalBookmarked += exam.bookmarked?.length || 0;
    exam.attempts?.forEach((a) => uniqueQuestions.add(`${code}-${a.questionId}`));
  });

  return {
    totalExams: exams.length,
    totalAttempts,
    totalCorrect,
    accuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
    totalBookmarked,
    uniqueQuestionsAnswered: uniqueQuestions.size,
    examsStarted: exams.length,
  };
}

// Get study streak (consecutive days with activity)
export function getStudyStreak() {
  const progress = getProgress();
  const allAttempts = [];

  Object.values(progress).forEach((exam) => {
    exam.attempts?.forEach((a) => {
      if (a.timestamp) {
        allAttempts.push(a.timestamp.slice(0, 10));
      }
    });
  });

  const uniqueDays = [...new Set(allAttempts)].sort().reverse();

  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // Check if active today or yesterday
  if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
    streak = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      const prev = new Date(uniqueDays[i - 1]);
      const curr = new Date(uniqueDays[i]);
      const diff = (prev - curr) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }
  }

  return {
    streak,
    lastStudyDay: uniqueDays[0] || null,
    totalStudyDays: uniqueDays.length,
  };
}

// Clear all progress (for testing/reset)
export function clearProgress() {
  safeSet(PROGRESS_KEY, {});
}
