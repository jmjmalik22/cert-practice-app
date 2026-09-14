import { useState } from "react";
import { Mail } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useTheme, FONT_DISPLAY, FONT_MONO } from "../lib/theme.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup() {
  const TOKENS = useTheme();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real users never see or fill this
  const [status, setStatus] = useState("idle"); // idle | loading | success | invalid | error

  async function handleSubmit(e) {
    e.preventDefault();

    if (company) {
      // Bot filled the honeypot field — pretend success without writing anything.
      setStatus("success");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");
    try {
      await addDoc(collection(db, "newsletterSignups"), {
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="rounded-2xl p-8 sm:p-10 flex flex-col items-center text-center relative overflow-hidden mb-16"
      style={{ background: TOKENS.panel, border: `1px solid ${TOKENS.panelBorder}` }}
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full" style={{ background: TOKENS.azure, filter: "blur(60px)" }} />
      </div>

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
        style={{ background: `${TOKENS.azure}15` }}
      >
        <Mail size={20} color={TOKENS.azure} />
      </div>

      <h2 className="text-xl font-bold mb-2 relative z-10" style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}>
        Get notified about new exams
      </h2>
      <p className="text-sm max-w-md mb-6 relative z-10" style={{ color: TOKENS.inkMuted }}>
        No spam — just a heads up when we add a new certification or a major study guide update.
      </p>

      {status === "success" ? (
        <p className="text-sm font-medium relative z-10" style={{ color: TOKENS.green }}>
          You&apos;re on the list — thanks for signing up.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm relative z-10">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
              style={{ background: TOKENS.bg, border: `1px solid ${TOKENS.panelBorder}`, color: TOKENS.ink }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-3 rounded-lg font-medium text-sm whitespace-nowrap"
              style={{ background: TOKENS.azure, color: TOKENS.bgDeep, opacity: status === "loading" ? 0.7 : 1, fontFamily: FONT_MONO }}
            >
              {status === "loading" ? "Joining..." : "Notify me"}
            </button>
          </div>
          {status === "invalid" && (
            <p className="text-xs mt-2" style={{ color: TOKENS.red }}>
              That doesn&apos;t look like a valid email — mind double-checking it?
            </p>
          )}
          {status === "error" && (
            <p className="text-xs mt-2" style={{ color: TOKENS.red }}>
              Something went wrong on our end — mind trying again in a moment?
            </p>
          )}
        </form>
      )}
    </div>
  );
}
