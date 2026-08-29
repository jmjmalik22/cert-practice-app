import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme, FONT_DISPLAY } from "../lib/theme.jsx";
import { useAuth } from "../lib/authContext.jsx";
import { Footer, MedallionMotif } from "../components/Shared.jsx";

export function Login() {
  const TOKENS = useTheme();
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await signup(email, password, displayName);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
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
