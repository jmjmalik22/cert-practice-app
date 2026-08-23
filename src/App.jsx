import { useState, useEffect, useRef } from "react";
import { Clock, CheckCircle2, XCircle, ArrowRight, RotateCcw, Flag, ChevronLeft } from "lucide-react";

// ---------------------------------------------------------------------------
// Question bank — grouped by exam, each item tagged with a domain so the
// bank can grow without touching any UI code. Add more objects to either
// array to expand coverage.
// ---------------------------------------------------------------------------
const QUESTION_BANK = {
  "DP-700": {
    label: "Fabric Data Engineer Associate",
    questions: [
      {
        id: "700-1",
        domain: "Implement and manage an analytics solution",
        question:
          "You need to ingest data from an on-premises SQL Server into a Fabric Lakehouse on a recurring schedule with minimal setup. Which Fabric item should you use?",
        options: [
          { id: "a", text: "A Dataflow Gen2" },
          { id: "b", text: "A Data Pipeline with a Copy activity" },
          { id: "c", text: "A KQL Database" },
          { id: "d", text: "A Semantic model" },
        ],
        correct: "b",
        explanation:
          "A Data Pipeline with a Copy activity, using the on-premises data gateway, is the standard way to schedule recurring ingestion into a Lakehouse from an on-prem source.",
      },
      {
        id: "700-2",
        domain: "Ingest and transform data",
        question:
          "Which file format is the default storage format for tables in a Fabric Lakehouse?",
        options: [
          { id: "a", text: "CSV" },
          { id: "b", text: "Parquet" },
          { id: "c", text: "Delta" },
          { id: "d", text: "Avro" },
        ],
        correct: "c",
        explanation:
          "Fabric Lakehouse tables are stored as Delta tables (Delta Lake format, itself built on Parquet), which gives you ACID transactions and time travel.",
      },
      {
        id: "700-3",
        domain: "Monitor and optimize an analytics solution",
        question:
          "You notice a Fabric Spark job is spending excessive time on small file reads. What is the recommended remediation?",
        options: [
          { id: "a", text: "Disable V-Order" },
          { id: "b", text: "Run OPTIMIZE (compaction) on the table" },
          { id: "c", text: "Convert the table to CSV" },
          { id: "d", text: "Increase the Spark pool node count only" },
        ],
        correct: "b",
        explanation:
          "Small-file problems are solved by compacting files with OPTIMIZE, which merges small Parquet/Delta files into larger ones for more efficient reads.",
      },
      {
        id: "700-4",
        domain: "Implement and manage an analytics solution",
        question:
          "Which Fabric workload would you use to run real-time analytics over streaming event data using KQL?",
        options: [
          { id: "a", text: "Data Warehouse" },
          { id: "b", text: "Eventhouse / KQL Database" },
          { id: "c", text: "Lakehouse SQL analytics endpoint" },
          { id: "d", text: "Dataflow Gen1" },
        ],
        correct: "b",
        explanation:
          "Eventhouse (backed by a KQL Database) is Fabric's real-time analytics workload, purpose-built for querying streaming and time-series data with KQL.",
      },
      {
        id: "700-5",
        domain: "Ingest and transform data",
        question:
          "In a medallion architecture built on Fabric, what is the primary purpose of the silver layer?",
        options: [
          { id: "a", text: "Store raw, unmodified source data" },
          { id: "b", text: "Store cleansed, validated, and conformed data" },
          { id: "c", text: "Store business-level aggregates only" },
          { id: "d", text: "Store semantic model metadata" },
        ],
        correct: "b",
        explanation:
          "Bronze holds raw data, silver holds cleansed/validated/conformed data, and gold holds business-level, aggregated data ready for reporting.",
      },
      {
        id: "700-6",
        domain: "Monitor and optimize an analytics solution",
        question:
          "Which tool would you use to monitor the run history and status of Fabric Data Pipelines and Spark jobs across a workspace?",
        options: [
          { id: "a", text: "Monitoring hub" },
          { id: "b", text: "Power BI Service usage metrics" },
          { id: "c", text: "Azure Monitor Workbooks only" },
          { id: "d", text: "Purview Data Catalog" },
        ],
        correct: "a",
        explanation:
          "The Fabric Monitoring hub gives a centralized view of item activity — pipeline runs, Spark jobs, refreshes — across a tenant or workspace.",
      },
      {
        id: "700-7",
        domain: "Implement and manage an analytics solution",
        question:
          "You want row-level security enforced on a Fabric Warehouse table so different sales reps see only their own region's rows. What should you implement?",
        options: [
          { id: "a", text: "A Dataflow filter" },
          { id: "b", text: "A security predicate function bound via CREATE SECURITY POLICY" },
          { id: "c", text: "A Power BI RLS role only" },
          { id: "d", text: "Object-level permissions (GRANT SELECT)" },
        ],
        correct: "b",
        explanation:
          "Row-level security in a Fabric Warehouse is implemented with a predicate function bound to the table through CREATE SECURITY POLICY, similar to SQL Server RLS.",
      },
      {
        id: "700-8",
        domain: "Ingest and transform data",
        question:
          "Which Fabric item provides a low-code, Power Query-based experience for transforming data before loading it to a Lakehouse or Warehouse?",
        options: [
          { id: "a", text: "Notebook" },
          { id: "b", text: "Dataflow Gen2" },
          { id: "c", text: "KQL Queryset" },
          { id: "d", text: "Data Activator" },
        ],
        correct: "b",
        explanation:
          "Dataflow Gen2 uses the familiar Power Query editor for low-code transformations and can write output directly to a Lakehouse or Warehouse.",
      },
    ],
  },
  "DP-600": {
    label: "Fabric Analytics Engineer Associate",
    questions: [
      {
        id: "600-1",
        domain: "Plan, implement, and manage a solution for data analytics",
        question:
          "What is the smallest unit of compute capacity purchase that enables Fabric workloads for an organization?",
        options: [
          { id: "a", text: "A Power BI Pro license" },
          { id: "b", text: "A Fabric capacity (F SKU)" },
          { id: "c", text: "An Azure Synapse pool" },
          { id: "d", text: "A Premium Per User license" },
        ],
        correct: "b",
        explanation:
          "Fabric workloads are enabled by purchasing a Fabric capacity (an F SKU), which provides the compute pool shared across all Fabric items in assigned workspaces.",
      },
      {
        id: "600-2",
        domain: "Prepare data",
        question:
          "You are modeling a star schema in a Fabric semantic model. Which type of table should contain the numeric measures used in analysis?",
        options: [
          { id: "a", text: "Dimension table" },
          { id: "b", text: "Fact table" },
          { id: "c", text: "Bridge table" },
          { id: "d", text: "Staging table" },
        ],
        correct: "b",
        explanation:
          "Fact tables hold the quantitative, measurable data (sales amount, quantity, etc.) and typically connect to surrounding dimension tables via keys.",
      },
      {
        id: "600-3",
        domain: "Implement and manage semantic models",
        question:
          "Which storage mode should you choose for a Power BI semantic model when you need sub-second query performance over a very large fact table without importing all the data?",
        options: [
          { id: "a", text: "Import mode" },
          { id: "b", text: "DirectQuery mode" },
          { id: "c", text: "Direct Lake mode" },
          { id: "d", text: "Live Connection to Analysis Services" },
        ],
        correct: "c",
        explanation:
          "Direct Lake mode reads Delta tables directly from OneLake without a separate import step, giving near-Import performance without duplicating the data.",
      },
      {
        id: "600-4",
        domain: "Explore and analyze data",
        question:
          "Which DAX function would you use to calculate a running total of Sales across a date column?",
        options: [
          { id: "a", text: "CALCULATE with a filter on the date column" },
          { id: "b", text: "TOTALYTD" },
          { id: "c", text: "SUMX over a related table" },
          { id: "d", text: "ALLEXCEPT" },
        ],
        correct: "a",
        explanation:
          "A running total is typically built with CALCULATE combined with a filter such as FILTER(ALL('Date'), 'Date'[Date] <= MAX('Date'[Date])) to accumulate values up to the current date.",
      },
      {
        id: "600-5",
        domain: "Prepare data",
        question:
          "In a Fabric Lakehouse, what is the purpose of the SQL analytics endpoint?",
        options: [
          { id: "a", text: "It lets you run T-SQL read-only queries against Delta tables" },
          { id: "b", text: "It provides write access via stored procedures" },
          { id: "c", text: "It replaces the need for a semantic model" },
          { id: "d", text: "It is used only for streaming ingestion" },
        ],
        correct: "a",
        explanation:
          "The SQL analytics endpoint auto-generates a read-only, T-SQL-queryable layer over the Delta tables in a Lakehouse, so BI tools can query with familiar SQL.",
      },
      {
        id: "600-6",
        domain: "Implement and manage semantic models",
        question:
          "Which feature would you use to define reusable business logic and metrics centrally so they're consistent across multiple reports?",
        options: [
          { id: "a", text: "Calculation groups" },
          { id: "b", text: "Bookmarks" },
          { id: "c", text: "Q&A visual" },
          { id: "d", text: "Drillthrough pages" },
        ],
        correct: "a",
        explanation:
          "Calculation groups let you define reusable calculation logic (e.g. time intelligence variants) once and apply it across many measures, keeping metrics consistent.",
      },
      {
        id: "600-7",
        domain: "Explore and analyze data",
        question:
          "A stakeholder wants to type a natural-language question and get a chart back from a Power BI report. Which feature supports this?",
        options: [
          { id: "a", text: "Q&A visual" },
          { id: "b", text: "Paginated reports" },
          { id: "c", text: "Composite models" },
          { id: "d", text: "Deployment pipelines" },
        ],
        correct: "a",
        explanation:
          "The Q&A visual lets users type natural-language questions against the semantic model and returns an auto-generated visual as the answer.",
      },
    ],
  },
};

const TOKENS = {
  bg: "#0B1220",
  panel: "#121B2E",
  panelBorder: "#223047",
  ink: "#EAEEF6",
  inkMuted: "#8C99B4",
  azure: "#3FA7FF",
  amber: "#F0A93A",
  green: "#3DDC97",
  red: "#FF6B6B",
};

const MOCK_LENGTH = 5;
const MOCK_SECONDS = 5 * 60;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Chip({ children, tone = "azure" }) {
  const colors = { azure: TOKENS.azure, amber: TOKENS.amber, green: TOKENS.green, red: TOKENS.red };
  return (
    <span
      className="text-xs font-medium px-2 py-1 rounded-full"
      style={{ color: colors[tone], background: `${colors[tone]}1A`, border: `1px solid ${colors[tone]}40` }}
    >
      {children}
    </span>
  );
}

function Home({ onStart }) {
  const [exam, setExam] = useState("DP-700");
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <div className="mb-10 text-center">
          <div className="text-xs tracking-widest uppercase mb-3" style={{ color: TOKENS.azure, letterSpacing: "0.2em" }}>
            Certification Practice
          </div>
          <h1 className="text-3xl font-semibold" style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
            Sit the exam before you sit the exam
          </h1>
          <p className="mt-3 text-sm" style={{ color: TOKENS.inkMuted }}>
            Practice questions for Microsoft Fabric certifications, built by someone who's taking them too.
          </p>
        </div>

        <div className="rounded-2xl p-6 mb-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div className="text-xs mb-3 font-medium" style={{ color: TOKENS.inkMuted }}>CHOOSE AN EXAM</div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(QUESTION_BANK).map(([code, data]) => (
              <button
                key={code}
                onClick={() => setExam(code)}
                className="text-left rounded-xl p-4 transition-colors"
                style={{
                  background: exam === code ? `${TOKENS.azure}1A` : "transparent",
                  border: `1px solid ${exam === code ? TOKENS.azure : TOKENS.panelBorder}`,
                }}
              >
                <div className="font-semibold" style={{ color: TOKENS.ink }}>{code}</div>
                <div className="text-xs mt-1" style={{ color: TOKENS.inkMuted }}>{data.label}</div>
                <div className="text-xs mt-2" style={{ color: TOKENS.azure }}>{data.questions.length} questions in bank</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onStart(exam, "practice")}
            className="rounded-2xl p-5 text-left transition-transform hover:-translate-y-0.5"
            style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <RotateCcw size={16} color={TOKENS.azure} />
              <span className="font-semibold" style={{ color: TOKENS.ink }}>Practice mode</span>
            </div>
            <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
              Untimed. Instant feedback and explanations after every question.
            </p>
          </button>

          <button
            onClick={() => onStart(exam, "mock")}
            className="rounded-2xl p-5 text-left transition-transform hover:-translate-y-0.5"
            style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} color={TOKENS.amber} />
              <span className="font-semibold" style={{ color: TOKENS.ink }}>Mock exam</span>
            </div>
            <p className="text-xs" style={{ color: TOKENS.inkMuted }}>
              {MOCK_LENGTH} questions, {Math.round(MOCK_SECONDS / 60)}-minute timer, scored at the end.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

function Practice({ exam, onExit }) {
  const pool = QUESTION_BANK[exam].questions;
  const [order] = useState(() => shuffle(pool));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, seen: 0 });

  const q = order[idx % order.length];

  function choose(optId) {
    if (revealed) return;
    setSelected(optId);
    setRevealed(true);
    setScore((s) => ({ correct: s.correct + (optId === q.correct ? 1 : 0), seen: s.seen + 1 }));
  }

  function next() {
    setSelected(null);
    setRevealed(false);
    setIdx((i) => i + 1);
  }

  return (
    <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
      <TopBar
        left={
          <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={16} /> Exit
          </button>
        }
        right={<Chip tone="azure">{exam} · Practice</Chip>}
      />

      <div className="mt-6 mb-3 flex items-center justify-between">
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{q.domain}</span>
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>
          Score: {score.correct}/{score.seen}
        </span>
      </div>

      <QuestionCard q={q} selected={selected} revealed={revealed} onChoose={choose} />

      {revealed && (
        <div className="flex justify-end mt-5">
          <button
            onClick={next}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: "#04101F" }}
          >
            Next question <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function MockExam({ exam, onExit }) {
  const pool = QUESTION_BANK[exam].questions;
  const [order] = useState(() => shuffle(pool).slice(0, Math.min(MOCK_LENGTH, pool.length)));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(MOCK_SECONDS);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (finished) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [finished]);

  const q = order[idx];
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  function choose(optId) {
    setAnswers((a) => ({ ...a, [q.id]: optId }));
  }

  function goto(i) {
    setIdx(Math.max(0, Math.min(order.length - 1, i)));
  }

  if (finished) {
    const correctCount = order.filter((qq) => answers[qq.id] === qq.correct).length;
    return (
      <div className="min-h-full px-6 py-8 max-w-2xl mx-auto w-full">
        <TopBar left={<span className="text-sm font-medium" style={{ color: TOKENS.ink }}>Results</span>} right={<Chip tone="amber">{exam} · Mock exam</Chip>} />

        <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
          <div className="text-5xl font-semibold" style={{ color: TOKENS.ink, fontFamily: "'Space Grotesk', sans-serif" }}>
            {correctCount}/{order.length}
          </div>
          <div className="text-sm mt-2" style={{ color: TOKENS.inkMuted }}>
            {Math.round((correctCount / order.length) * 100)}% correct
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {order.map((qq, i) => {
            const given = answers[qq.id];
            const isCorrect = given === qq.correct;
            return (
              <div key={qq.id} className="rounded-xl p-4" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
                <div className="flex items-start gap-2">
                  {isCorrect ? <CheckCircle2 size={18} color={TOKENS.green} /> : <XCircle size={18} color={TOKENS.red} />}
                  <div>
                    <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>
                      Q{i + 1}. {qq.question}
                    </div>
                    <div className="text-xs mt-2" style={{ color: TOKENS.inkMuted }}>
                      {given ? (
                        <>Your answer: <span style={{ color: isCorrect ? TOKENS.green : TOKENS.red }}>{qq.options.find((o) => o.id === given)?.text}</span></>
                      ) : (
                        <span style={{ color: TOKENS.amber }}>Not answered</span>
                      )}
                    </div>
                    {!isCorrect && (
                      <div className="text-xs mt-1" style={{ color: TOKENS.green }}>
                        Correct: {qq.options.find((o) => o.id === qq.correct)?.text}
                      </div>
                    )}
                    <div className="text-xs mt-2" style={{ color: TOKENS.inkMuted }}>{qq.explanation}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={onExit} className="px-5 py-2.5 rounded-full font-medium text-sm" style={{ background: TOKENS.azure, color: "#04101F" }}>
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col px-6 py-8 max-w-2xl mx-auto w-full">
      <TopBar
        left={
          <button onClick={onExit} className="flex items-center gap-1 text-sm" style={{ color: TOKENS.inkMuted }}>
            <ChevronLeft size={16} /> Exit
          </button>
        }
        right={
          <div className="flex items-center gap-2">
            <Clock size={14} color={secondsLeft < 30 ? TOKENS.red : TOKENS.amber} />
            <span className="text-sm font-mono" style={{ color: secondsLeft < 30 ? TOKENS.red : TOKENS.ink }}>{mm}:{ss}</span>
          </div>
        }
      />

      <div className="mt-6 mb-3 flex items-center justify-between">
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>Question {idx + 1} of {order.length}</span>
        <span className="text-xs" style={{ color: TOKENS.inkMuted }}>{Object.keys(answers).length} answered</span>
      </div>

      <div className="flex gap-1 mb-5">
        {order.map((qq, i) => (
          <div
            key={qq.id}
            className="h-1.5 flex-1 rounded-full"
            style={{ background: answers[qq.id] ? TOKENS.azure : i === idx ? TOKENS.panelBorder : "#1B2740" }}
          />
        ))}
      </div>

      <QuestionCard q={q} selected={answers[q.id] || null} revealed={false} onChoose={choose} />

      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() => goto(idx - 1)}
          disabled={idx === 0}
          className="px-4 py-2 rounded-full text-sm font-medium disabled:opacity-30"
          style={{ border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
        >
          Back
        </button>
        {idx === order.length - 1 ? (
          <button
            onClick={() => setFinished(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.green, color: "#04101F" }}
          >
            <Flag size={16} /> Submit exam
          </button>
        ) : (
          <button
            onClick={() => goto(idx + 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ background: TOKENS.azure, color: "#04101F" }}
          >
            Next <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function TopBar({ left, right }) {
  return (
    <div className="flex items-center justify-between">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function QuestionCard({ q, selected, revealed, onChoose }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}>
      <div className="text-base font-medium mb-5" style={{ color: TOKENS.ink }}>{q.question}</div>
      <div className="space-y-2.5">
        {q.options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrectOpt = opt.id === q.correct;
          let border = TOKENS.panelBorder;
          let bg = "transparent";
          if (revealed) {
            if (isCorrectOpt) { border = TOKENS.green; bg = `${TOKENS.green}14`; }
            else if (isSelected) { border = TOKENS.red; bg = `${TOKENS.red}14`; }
          } else if (isSelected) {
            border = TOKENS.azure; bg = `${TOKENS.azure}14`;
          }
          return (
            <button
              key={opt.id}
              onClick={() => onChoose(opt.id)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between transition-colors"
              style={{ border: `1px solid ${border}`, background: bg, color: TOKENS.ink }}
            >
              <span>{opt.text}</span>
              {revealed && isCorrectOpt && <CheckCircle2 size={16} color={TOKENS.green} />}
              {revealed && isSelected && !isCorrectOpt && <XCircle size={16} color={TOKENS.red} />}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="mt-4 text-xs leading-relaxed p-3 rounded-lg" style={{ color: TOKENS.inkMuted, background: "#0E1626" }}>
          {q.explanation}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [exam, setExam] = useState("DP-700");

  function start(examCode, mode) {
    setExam(examCode);
    setScreen(mode);
  }

  return (
    <div className="min-h-screen w-full" style={{ background: TOKENS.bg, fontFamily: "'Inter', sans-serif" }}>
      {screen === "home" && <Home onStart={start} />}
      {screen === "practice" && <Practice exam={exam} onExit={() => setScreen("home")} />}
      {screen === "mock" && <MockExam exam={exam} onExit={() => setScreen("home")} />}
    </div>
  );
}
