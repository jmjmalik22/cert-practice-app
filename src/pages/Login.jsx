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
  const { login, signup, loginWithGoogle, resendVerificationEmail, refreshUser, resetPassword } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  function getAuthErrorMessage(err) {
    const messages = {
      "auth/invalid-credential": "The email or password is incorrect.",
      "auth/user-not-found": "The email or password is incorrect.",
      "auth/wrong-password": "The email or password is incorrect.",
      "auth/email-already-in-use": "An account already exists with this email.",
      "auth/weak-password": "Your password must be at least 6 characters.",
      "auth/invalid-email": "Enter a valid email address.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
      "auth/popup-closed-by-user": "The Google sign-in window was closed before sign-in completed.",
      "auth/popup-blocked": "Your browser blocked the Google sign-in window. Allow pop-ups and try again.",
      "auth/unauthorized-domain": "This website is not authorized for Google Sign-In. Add its domain in Firebase Authentication settings.",
      "auth/account-exists-with-different-credential": "An account already exists with this email. Sign in with email and password instead.",
      "auth/operation-not-allowed": "Google Sign-In is not enabled in Firebase. Enable Google under Authentication → Sign-in providers.",
      "auth/cancelled-popup-request": "Another Google sign-in window is already open. Finish it or close it and try again.",
      "auth/network-request-failed": "Network error while contacting Google. Check your connection and try again.",
      "auth/invalid-api-key": "The Firebase web configuration is invalid. Check the Firebase project configuration.",
      "auth/app-not-authorized": "This app is not authorized for Firebase Authentication. Check the Firebase web app configuration.",
    };
    return messages[err.code] || "Authentication failed. Please try again.";
  }

  async function handleGoogleSignIn() {
    setError("");
    setNotice("");
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setNotice("");
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
      setError(getAuthErrorMessage(err));
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
      setError(getAuthErrorMessage(err));
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
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setNotice("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(getAuthErrorMessage(err));
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

          {notice && (
            <div
              className="w-full p-3 rounded-lg mb-4 text-sm"
              role="status"
              style={{ background: `${TOKENS.green}20`, color: TOKENS.green, border: `1px solid ${TOKENS.green}40` }}
            >
              {notice}
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
            role="alert"
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

          {!isSignup && (
            <>
              <div className="flex items-center gap-3 py-1" aria-hidden="true">
                <div className="h-px flex-1" style={{ background: TOKENS.panelBorder }} />
                <span className="text-xs" style={{ color: TOKENS.inkMuted }}>OR</span>
                <div className="h-px flex-1" style={{ background: TOKENS.panelBorder }} />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 rounded-full font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-3"
                style={{ background: TOKENS.panel, color: TOKENS.ink, border: `1px solid ${TOKENS.panelBorder}` }}
              >
                <span className="font-bold text-base" aria-hidden="true">G</span>
                Continue with Google
              </button>
            </>
          )}

          {!isSignup && (
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={loading}
              className="w-full text-xs mt-3 disabled:opacity-50"
              style={{ color: TOKENS.azure }}
            >
              Forgot password?
            </button>
          )}
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
              setNotice("");
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
