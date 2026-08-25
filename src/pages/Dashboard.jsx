import { useState, useEffect } from "react";
import { Head as Helmet } from "vite-react-ssg";
import { Link, useOutletContext } from "react-router-dom";
import { Trophy, Target, BookOpen, Calendar, Flame, Award, ChevronRight } from "lucide-react";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";
import { QUESTION_BANK, EXAM_META } from "../lib/questionBank.jsx";
import { Header, Footer } from "../components/Shared.jsx";
import { getOverallStats, getExamStats, getStudyStreak } from "../lib/progress.jsx";

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

  if (!meta) return null;

  return (
    <Link
      to={`/${meta.slug}`}
      className="block rounded-xl p-5 transition-all hover:opacity-90"
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
            {stats.uniqueQuestionsAnswered} of {totalQuestions} questions
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
          {stats.accuracy}%
        </div>
      </div>

      <ProgressBar progress={(stats.uniqueQuestionsAnswered / totalQuestions) * 100} color="azure" />

      <div className="flex items-center justify-between mt-4 text-xs" style={{ color: TOKENS.inkMuted }}>
        <span>{stats.completion}% complete</span>
        <span>{stats.correct}/{stats.totalAttempts} correct</span>
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

export function Dashboard() {
  const { theme, onToggleTheme, streak } = useOutletContext();
  const TOKENS = useTheme();
  const [stats, setStats] = useState(null);
  const [examStats, setExamStats] = useState([]);
  const [studyStreak, setStudyStreak] = useState({ streak: 0, totalStudyDays: 0 });

  useEffect(() => {
    const overall = getOverallStats();
    const streakData = getStudyStreak();
    setStats(overall);
    setStudyStreak(streakData);

    // Get stats for each exam that has progress
    const exams = Object.keys(QUESTION_BANK);
    const examData = exams
      .map((code) => ({
        code,
        stats: getExamStats(code, QUESTION_BANK[code]?.questions.length || 0),
      }))
      .filter((e) => e.stats.totalAttempts > 0)
      .sort((a, b) => b.stats.lastAttempt - a.stats.lastAttempt);

    setExamStats(examData);
  }, []);

  if (!stats) return null;

  return (
    <div className="min-h-full flex flex-col">
      <Helmet>
        <title>Dashboard | FabricPrep</title>
        <meta name="description" content="Track your Microsoft certification study progress with FabricPrep." />
      </Helmet>

      <Header theme={theme} onToggleTheme={onToggleTheme} streak={streak} />

      <main className="flex-1 px-6 sm:px-10 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
            Your Progress
          </h1>
          <p style={{ color: TOKENS.inkMuted }}>
            Track your certification journey and see how far you have come.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Trophy}
            label="Questions Answered"
            value={stats.totalAttempts}
            subtext={`${stats.uniqueQuestionsAnswered} unique`}
            color="amber"
          />
          <StatCard
            icon={Target}
            label="Accuracy Rate"
            value={`${stats.accuracy}%`}
            subtext={`${stats.totalCorrect} correct`}
            color="green"
          />
          <StatCard
            icon={Flame}
            label="Study Streak"
            value={`${studyStreak.streak} days`}
            subtext={`${studyStreak.totalStudyDays} total days`}
            color="amber"
          />
          <StatCard
            icon={BookOpen}
            label="Bookmarked"
            value={stats.totalBookmarked}
            subtext="Questions saved"
            color="azure"
          />
        </div>

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
          </div>

          {/* Activity & Quick Links */}
          <div>
            {/* Weekly Activity */}
            {examStats[0]?.stats?.dailyActivity && (
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
                <ActivityChart data={examStats[0].stats.dailyActivity} />
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
