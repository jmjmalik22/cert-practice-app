import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, X, ArrowRight } from "lucide-react";
import { useTheme, FONT_DISPLAY } from "../lib/theme.jsx";
import { getUser, saveUser } from "../lib/progress.jsx";

export function UserProfileModal({ onClose }) {
  const TOKENS = useTheme();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: `${TOKENS.bgDeep}CC` }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 relative"
        style={{
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.panelBorder}`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg transition-colors"
          style={{ color: TOKENS.inkMuted }}
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: `${TOKENS.azure}1A` }}
          >
            <User size={32} style={{ color: TOKENS.azure }} />
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}
          >
            Welcome to FabricPrep!
          </h2>
          <p style={{ color: TOKENS.inkMuted }}>
            Sign in to track your progress across sessions and access all features.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/login"
            className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-opacity"
            style={{
              background: TOKENS.azure,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Sign In <ArrowRight size={18} />
          </Link>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg font-medium transition-colors"
            style={{
              background: "transparent",
              color: TOKENS.inkMuted,
              border: `1px solid ${TOKENS.panelBorder}`,
            }}
          >
            Continue as Guest
          </button>
        </div>

        <p
          className="text-xs text-center mt-4"
          style={{ color: TOKENS.inkMuted }}
        >
          Guests can access Mock Exams with 5 free questions. Sign in for unlimited access.
        </p>
      </div>
    </div>
  );
}

export function UserBadge() {
  const TOKENS = useTheme();
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  function handleUpdate(updatedUser) {
    setUser(updatedUser);
    setShowEditModal(false);
  }

  if (!user?.name) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <button
        onClick={() => setShowEditModal(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
        style={{
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.panelBorder}`,
          color: TOKENS.ink,
        }}
        title="Click to edit profile"
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: TOKENS.azure, color: "#fff" }}
        >
          {initials}
        </div>
        <span className="text-sm hidden sm:block">{user.name}</span>
      </button>
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}

function EditProfileModal({ user, onClose, onSave }) {
  const TOKENS = useTheme();
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      const updated = getUser();
      updated.name = name.trim();
      updated.email = email.trim();
      saveUser(updated);
      onSave(updated);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: `${TOKENS.bgDeep}CC` }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 relative"
        style={{
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.panelBorder}`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg transition-colors"
          style={{ color: TOKENS.inkMuted }}
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: TOKENS.ink, fontFamily: FONT_DISPLAY }}
          >
            Edit Profile
          </h2>
          <p style={{ color: TOKENS.inkMuted }}>
            Update your name and email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: TOKENS.ink }}
            >
              Your Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors"
              style={{
                background: TOKENS.bg,
                border: `1px solid ${TOKENS.panelBorder}`,
                color: TOKENS.ink,
              }}
              autoFocus
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: TOKENS.inkMuted }}
            >
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="For future sync features"
              className="w-full px-4 py-3 rounded-lg outline-none transition-colors"
              style={{
                background: TOKENS.bg,
                border: `1px solid ${TOKENS.panelBorder}`,
                color: TOKENS.ink,
              }}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg font-medium transition-colors"
              style={{
                background: TOKENS.panelBorder,
                color: TOKENS.ink,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-3 rounded-lg font-medium transition-opacity disabled:opacity-50"
              style={{
                background: TOKENS.azure,
                color: "#fff",
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
