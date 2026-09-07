import { useState, useEffect } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { Trophy, Target, BookOpen, Calendar, Flame, Award, ChevronRight, AlertCircle } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { QUESTION_BANK, EXAM_META } from "../lib/questionBank/index.js";
import { Footer } from "../components/Shared.jsx";
import { getOverallStats, getExamStats, getUser, getExamResults, getWeakDomainRecommendations, getWrongAnswerSummary } from "../lib/progress.jsx";
import { getAttempted, updateStreak } from "../lib/theme.jsx";

function StatCard({ icon: Icon, label, value, subtext, color = "azure" }) {
  const TOKENS = useTheme();
  const colors = {
    azure: TOKENS.azure,
    amber: TOKENS.amber,
    green: TOKENS.green,
    red: TOKENS.red,
  };

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: TOKENS.panel,
        border: `1px solid ${TOKENS.panelBorder}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${colors[color]}1A` }}
        >
          <Icon size={20} style={{ color: colors[color] }} />
        </div>
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
        {value}
      </div>
      <div className="text-sm mb-1" style={{ color: TOKENS.inkMuted }}>
        {label}
      </div>
      {subtext && (
        <div className="text-xs" style={{ color: TOKENS.inkMuted, opacity: 0.8 }}>
          {subtext}
        </div>
      )}
    </div>
  );
}

function ProgressBar({ progress, color = "azure" }) {
  const TOKENS = useTheme();
  const colors = {
    azure: TOKENS.azure,
    amber: TOKENS.amber,
    green: TOKENS.green,
    red: TOKENS.red,
  };

  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ background: TOKENS.panelBorder }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(100, progress)}%`,
          background: colors[color],
        }}
      />
    </div>
  );
}

function ExamProgressCard({ examCode, stats }) {
  const TOKENS = useTheme();
  const meta = EXAM_META[examCode];
  const totalQuestions = QUESTION_BANK[examCode]?.questions.length || 0;
  const attempted = getAttempted(examCode).length;
  const coverage = totalQuestions > 0 ? Math.round((attempted / totalQuestions) * 100) : 0;

  if (!meta) return null;

  return (
    <Link
      to={`/${meta.slug}`}
      className="block rounded-xl p-5 transition-all hover:opacity-90 relative"
      style={{
        background: TOKENS.panel,
        border: `1px solid ${TOKENS.panelBorder}`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold mb-1" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            {examCode}
          </h3>
          <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
            {attempted} of {totalQuestions} questions seen
          </p>
        </div>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
          style={{
            background: `${TOKENS.azure}1A`,
            color: TOKENS.azure,
            fontFamily: FONT_MONO,
          }}
        >
          {coverage}%
        </div>
      </div>

      <ProgressBar progress={coverage} color="azure" />

      <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-center">
        <div>
          <div className="font-semibold" style={{ color: TOKENS.ink }}>{stats.totalAttempts}</div>
          <div style={{ color: TOKENS.inkMuted }}>Total Attempts</div>
        </div>
        <div>
          <div className="font-semibold" style={{ color: TOKENS.green }}>{stats.correct}</div>
          <div style={{ color: TOKENS.inkMuted }}>Correct</div>
        </div>
        <div>
          <div className="font-semibold" style={{ color: TOKENS.amber }}>{stats.accuracy}%</div>
          <div style={{ color: TOKENS.inkMuted }}>Accuracy</div>
        </div>
      </div>

      {stats.bookmarked > 0 && (
        <div
          className="mt-3 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1"
          style={{ background: `${TOKENS.amber}1A`, color: TOKENS.amber }}
        >
          <BookOpen size={12} />
          {stats.bookmarked} bookmarked
        </div>
      )}

      <ChevronRight
        size={16}
        className="absolute bottom-5 right-5"
        style={{ color: TOKENS.inkMuted }}
      />
    </Link>
  );
}

function ExamResultsSection() {
  const TOKENS = useTheme();
  const [results, setResults] = useState([]);

  useEffect(() => {
    function loadResults() {
      setResults(getExamResults());
    }

    loadResults();
    window.addEventListener("fp-progress-synced", loadResults);
    return () => window.removeEventListener("fp-progress-synced", loadResults);
  }, []);

  if (results.length === 0) return null;

  // Group by exam
  const byExam = results.reduce((acc, r) => {
    if (!acc[r.examCode]) acc[r.examCode] = [];
    acc[r.examCode].push(r);
    return acc;
  }, {});

  return (
    <div className="mt-8">
      <h2
        className="text-lg font-semibold mb-4 flex items-center gap-2"
        style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}
      >
        <Trophy size={20} style={{ color: TOKENS.amber }} />
        Mock Exam Results
      </h2>
      <div className="space-y-4">
        {Object.entries(byExam).map(([examCode, examResults]) => {
          const best = examResults.reduce((b, c) => (c.percentage > b.percentage ? c : b));
          const latest = examResults[examResults.length - 1];
          const meta = EXAM_META[examCode];

          return (
            <div
              key={examCode}
              className="rounded-xl p-4"
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.panelBorder}`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium" style={{ color: TOKENS.ink }}>
                  {examCode}
                </span>
                <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
                  {examResults.length} attempt{examResults.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold" style={{ color: TOKENS.green }}>
                    {best.percentage}%
                  </div>
                  <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Best Score</div>
                </div>
                <div>
                  <div className="text-lg font-bold" style={{ color: TOKENS.azure }}>
                    {latest.percentage}%
                  </div>
                  <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Latest</div>
                </div>
                <div>
                  <div className="text-lg font-bold" style={{ color: TOKENS.ink }}>
                    {best.score}/{best.total}
                  </div>
                  <div className="text-xs" style={{ color: TOKENS.inkMuted }}>Best</div>
                </div>
              </div>

              {/* List all attempts for this exam */}
              <div className="mt-3 pt-3 border-t" style={{ borderColor: TOKENS.panelBorder }}>
                <p className="text-xs font-medium mb-2" style={{ color: TOKENS.inkMuted }}>
                  All attempts:
                </p>
                <div className="space-y-2">
                  {examResults.map((result, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded"
                      style={{ background: TOKENS.bg }}
                    >
                      <span style={{ color: TOKENS.inkMuted }}>
                        #{idx + 1} · {new Date(result.timestamp).toLocaleDateString()}
                      </span>
                      <span
                        className="font-medium"
                        style={{
                          color:
                            result.percentage >= 70
                              ? TOKENS.green
                              : result.percentage >= 50
                              ? TOKENS.amber
                              : TOKENS.red,
                        }}
                      >
                        {result.score}/{result.total} ({result.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeakDomainsSection({ recommendations }) {
  const TOKENS = useTheme();

  if (recommendations.length === 0) return null;

  return (
    <div className="mb-8">
      <h2
        className="text-lg font-semibold mb-2 flex items-center gap-2"
        style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}
      >
        <AlertCircle size={20} style={{ color: TOKENS.amber }} />
        Focus your study
      </h2>
      <p className="text-sm mb-4" style={{ color: TOKENS.inkMuted }}>
        These domains have the lowest accuracy based on your recent practice.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {recommendations.map((rec) => {
          const meta = EXAM_META[rec.examCode];
          const practiceUrl = `/${meta.slug}?mode=practice&domain=${encodeURIComponent(rec.domain)}`;
          const accuracyColor =
            rec.accuracy >= 50 ? TOKENS.amber : TOKENS.red;

          return (
            <Link
              key={`${rec.examCode}:${rec.domain}`}
              to={practiceUrl}
              className="rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg block"
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.amber}35`,
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div
                    className="text-xs font-medium mb-1"
                    style={{ color: TOKENS.azure, fontFamily: FONT_MONO }}
                  >
                    {rec.examCode}
                  </div>
                  <h3 className="font-semibold text-sm leading-snug" style={{ color: TOKENS.ink }}>
                    {rec.domain}
                  </h3>
                </div>
                <div
                  className="text-lg font-bold flex-shrink-0"
                  style={{ color: accuracyColor, fontFamily: FONT_DISPLAY }}
                >
                  {rec.accuracy}%
                </div>
              </div>

              <ProgressBar progress={rec.accuracy} color={rec.accuracy >= 50 ? "amber" : "red"} />

              <p className="text-xs mt-3 mb-4" style={{ color: TOKENS.inkMuted }}>
                {rec.attempts} attempts across {rec.questionCount} questions in this domain
              </p>

              <span
                className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: `${TOKENS.azure}15`,
                  color: TOKENS.azure,
                  border: `1px solid ${TOKENS.azure}30`,
                }}
              >
                Practice {rec.practiceCount} questions
                <ChevronRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function WrongAnswersSection() {
  const TOKENS = useTheme();
  const wrongAnswers = getWrongAnswerSummary(QUESTION_BANK);

  if (wrongAnswers.length === 0) return null;

  return (
    <div className="mb-8 rounded-xl p-5" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.red}40` }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-1" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Review wrong answers
          </h2>
          <p className="text-sm" style={{ color: TOKENS.inkMuted }}>
            Revisit questions you most recently answered incorrectly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {wrongAnswers.map(({ examCode, count }) => {
            const meta = EXAM_META[examCode];
            return (
              <Link
                key={examCode}
                to={`/${meta.slug}?mode=practice&review=wrong`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
                style={{ background: `${TOKENS.red}15`, color: TOKENS.red, border: `1px solid ${TOKENS.red}35` }}
              >
                {examCode} · {count} question{count === 1 ? "" : "s"}
                <ChevronRight size={14} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ActivityChart({ data }) {
  const TOKENS = useTheme();
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex items-end gap-2 h-24 mt-4">
      {data.map((day, i) => (
        <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t transition-all duration-300"
            style={{
              height: `${(day.count / maxCount) * 100}%`,
              background: day.count > 0 ? TOKENS.azure : TOKENS.panelBorder,
              minHeight: day.count > 0 ? 4 : 2,
            }}
          />
          <span className="text-[10px]" style={{ color: TOKENS.inkMuted }}>
            {new Date(day.date).toLocaleDateString("en", { weekday: "narrow" })}
          </span>
        </div>
      ))}
    </div>
  );
}

function aggregateActivity(examStats) {
  const byDate = new Map();

  examStats.forEach(({ stats }) => {
    (stats.dailyActivity || []).forEach(({ date, count }) => {
      byDate.set(date, (byDate.get(date) || 0) + count);
    });
  });

  return [...byDate.entries()]
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, count]) => ({ date, count }));
}

export function Dashboard() {
  const { user, isAuthenticated } = useOutletContext();
  const TOKENS = useTheme();
  const [stats, setStats] = useState(null);
  const [examStats, setExamStats] = useState([]);
  const [visitStreak, setVisitStreak] = useState(0);
  const [localUser, setLocalUser] = useState(null);
  const [weakDomains, setWeakDomains] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    function loadStats() {
      const overall = getOverallStats();
      const streakCount = updateStreak();
      const userData = getUser();
      setStats(overall);
      setVisitStreak(streakCount);
      setLocalUser(userData);
      setWeakDomains(getWeakDomainRecommendations(QUESTION_BANK));

      const exams = Object.keys(QUESTION_BANK);
      const examData = exams
        .map((code) => ({
          code,
          stats: getExamStats(code, QUESTION_BANK[code]?.questions.length || 0),
        }))
        .filter((e) => e.stats.totalAttempts > 0)
        .sort((a, b) => new Date(b.stats.lastAttempt || 0) - new Date(a.stats.lastAttempt || 0));

      setExamStats(examData);
    }

    loadStats();
    window.addEventListener("fp-progress-synced", loadStats);
    return () => window.removeEventListener("fp-progress-synced", loadStats);
  }, [isAuthenticated]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!stats) return null;
  const displayName = user?.displayName || localUser?.name;
  const activity = aggregateActivity(examStats);

  return (
    <div className="min-h-full flex flex-col">
       <Helmet>
        <title>Dashboard | FabricPrep</title>
        <link rel="canonical" href="https://fabricprep.com/dashboard" />
        <meta name="description" content="Track your Microsoft certification study progress with FabricPrep." />
        {/* Logged-in, per-user page with no unique content for search engines to index */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="flex-1 px-6 sm:px-10 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            {displayName ? `Hello, ${displayName}!` : "Your Progress"}
          </h1>
          <p style={{ color: TOKENS.inkMuted }}>
            Track your certification journey and see how far you have come.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={Trophy}
            label="Total Attempts"
            value={stats.totalAttempts}
            subtext={`${stats.uniqueQuestionsAnswered} unique questions`}
            color="amber"
          />
          <StatCard
            icon={Target}
            label="Correct Answers"
            value={stats.totalCorrect}
            subtext={`${stats.accuracy}% accuracy rate`}
            color="green"
          />
          <StatCard
            icon={Flame}
            label="Study Streak"
            value={`${visitStreak} day${visitStreak === 1 ? "" : "s"}`}
            subtext="Keep it up!"
            color="amber"
          />
        </div>

        <WeakDomainsSection recommendations={weakDomains} />
        <WrongAnswersSection />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Exam Progress */}
          <div className="md:col-span-2">
            <h2
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}
            >
              <Award size={20} style={{ color: TOKENS.azure }} />
              Exam Progress
            </h2>

            {examStats.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {examStats.map(({ code, stats }) => (
                  <ExamProgressCard key={code} examCode={code} stats={stats} />
                ))}
              </div>
            ) : (
              <div
                className="rounded-xl p-8 text-center"
                style={{
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.panelBorder}`,
                }}
              >
                <p style={{ color: TOKENS.inkMuted }} className="mb-4">
                  You have not started any exams yet.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: TOKENS.azure, color: "#fff" }}
                >
                  Start Practicing
                  <ChevronRight size={16} />
                </Link>
              </div>
            )}

            {/* Mock Exam Results */}
            <ExamResultsSection />
          </div>

          {/* Activity & Quick Links */}
          <div>
            {/* Weekly Activity */}
            {activity.length > 0 && (
              <div
                className="rounded-xl p-5 mb-4"
                style={{
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.panelBorder}`,
                }}
              >
                <h3
                  className="font-semibold mb-2 flex items-center gap-2"
                  style={{ color: TOKENS.ink }}
                >
                  <Calendar size={18} style={{ color: TOKENS.azure }} />
                  Last 7 Days
                </h3>
                <ActivityChart data={activity} />
              </div>
            )}

            {/* Quick Start */}
            <div
              className="rounded-xl p-5"
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.panelBorder}`,
              }}
            >
              <h3
                className="font-semibold mb-4"
                style={{ color: TOKENS.ink }}
              >
                Continue Studying
              </h3>
              <div className="space-y-2">
                {Object.entries(EXAM_META).slice(0, 4).map(([code, meta]) => (
                  <Link
                    key={code}
                    to={`/${meta.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg text-sm transition-colors"
                    style={{
                      background: TOKENS.bg,
                      color: TOKENS.ink,
                    }}
                  >
                    <span>{code}</span>
                    <ChevronRight size={16} style={{ color: TOKENS.inkMuted }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
