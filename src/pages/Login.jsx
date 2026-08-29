import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { useTheme, FONT_DISPLAY } from "../lib/theme.jsx";
import { useAuth } from "../lib/authContext.jsx";
import { auth } from "../lib/firebase.js";
import { Footer, MedallionMotif } from "../components/Shared.jsx";

export function Login() {
  const TOKENS = useTheme();
  const navigate = useNavigate();
  const { login, signup, resendVerificationEmail, refreshUser } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await signup(email, password, displayName);
        // Show verification notice but don't block - Firebase emails are unreliable
        setVerificationPending(true);
      } else {
        const user = await login(email, password);
        // Allow login even if not verified - show banner instead of blocking
        if (!user.emailVerified) {
          setVerificationPending(true);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendEmail() {
    try {
      await resendVerificationEmail();
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to resend email");
    }
  }

  async function checkVerification() {
    setLoading(true);
    try {
      await refreshUser();
      // Check if email is now verified
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.emailVerified) {
        window.location.href = "/";
      } else {
        setError("Email not verified yet. Please check your inbox and click the verification link.");
      }
    } catch (err) {
      setError(err.message || "Failed to check verification");
    } finally {
      setLoading(false);
    }
  }

  if (verificationPending) {
    return (
      <div className="min-h-full flex flex-col px-6 py-8 max-w-md mx-auto w-full">
        <div className="flex-1 flex flex-col items-center justify-center">
          <MedallionMotif opacity={0.5} />
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ background: `${TOKENS.azure}1A` }}
          >
            <Mail size={32} style={{ color: TOKENS.azure }} />
          </div>
          <h1
            className="text-2xl font-semibold mb-2 text-center"
            style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}
          >
            Verify Your Email
          </h1>
          <p className="text-sm text-center mb-2" style={{ color: TOKENS.inkMuted }}>
            We sent a verification link to <strong style={{ color: TOKENS.ink }}>{email}</strong>.
          </p>
          <p className="text-xs text-center mb-6" style={{ color: TOKENS.amber }}>
            Can't find it? Check spam/junk folder. Delivery may take a few minutes.
          </p>

          {error && (
            <div
              className="w-full p-3 rounded-lg mb-4 text-sm"
              style={{ background: `${TOKENS.red}20`, color: TOKENS.red, border: `1px solid ${TOKENS.red}40` }}
            >
              {error}
            </div>
          )}

          <div className="w-full space-y-3">
            <button
              onClick={checkVerification}
              disabled={loading}
              className="w-full py-3 rounded-full font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "transparent", color: TOKENS.ink, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              <CheckCircle size={16} />
              {loading ? "Checking..." : "I've verified my email"}
            </button>

            <button
              onClick={handleResendEmail}
              disabled={resendTimer > 0 || loading}
              className="w-full py-3 rounded-full font-medium text-sm disabled:opacity-50"
              style={{ background: "transparent", color: TOKENS.ink, border: `1px solid ${TOKENS.panelBorder}` }}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend verification email"}
            </button>

            <Link
              to="/"
              className="w-full py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2"
              style={{ background: "transparent", color: TOKENS.inkMuted, textDecoration: "none" }}
            >
              Skip for now — Continue as guest →
            </Link>

            <button
              onClick={() => setVerificationPending(false)}
              className="w-full py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2"
              style={{ background: "transparent", color: TOKENS.inkMuted }}
            >
              <ArrowLeft size={16} />
              Back to {isSignup ? "sign up" : "sign in"}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col px-6 py-8 max-w-md mx-auto w-full">
      <div className="flex-1 flex flex-col items-center justify-center">
        <MedallionMotif opacity={0.5} />
        <h1
          className="text-2xl sm:text-3xl font-semibold mt-4 mb-2 text-center"
          style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}
        >
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: TOKENS.inkMuted }}>
          {isSignup
            ? "Sign up to track your progress across devices"
            : "Sign in to continue your certification journey"}
        </p>

        {error && (
          <div
            className="w-full p-3 rounded-lg mb-4 text-sm"
            style={{ background: `${TOKENS.red}20`, color: TOKENS.red, border: `1px solid ${TOKENS.red}40` }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs mb-1" style={{ color: TOKENS.inkMuted }}>
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{
                  background: TOKENS.panel,
                  border: `1px solid ${TOKENS.panelBorder}`,
                  color: TOKENS.ink,
                }}
                placeholder="Your name"
                required={isSignup}
              />
            </div>
          )}

          <div>
            <label className="block text-xs mb-1" style={{ color: TOKENS.inkMuted }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm"
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.panelBorder}`,
                color: TOKENS.ink,
              }}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: TOKENS.inkMuted }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm"
              style={{
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.panelBorder}`,
                color: TOKENS.ink,
              }}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-medium text-sm mt-6 disabled:opacity-50"
            style={{ background: TOKENS.azure, color: TOKENS.bgDeep }}
          >
            {loading ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-sm"
            style={{ color: TOKENS.azure }}
          >
            {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs" style={{ color: TOKENS.inkMuted }}>
            Continue as guest
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
