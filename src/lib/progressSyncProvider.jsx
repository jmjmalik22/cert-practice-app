import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext.jsx";
import { pullAndMergeProgress, scheduleCloudSync, setActiveSyncUid } from "./progressSync.js";
import { syncBadgesToCloud } from "./badges.js";
import { captureScopeToken, isScopeTokenCurrent } from "./storageScope.js";

const ProgressSyncContext = createContext({ syncing: false });

export function ProgressSyncProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [syncing, setSyncing] = useState(false);

  // Local storage is scoped by *account presence*, not by verification state:
  // an unverified signed-in user still gets their own scope, so two unverified
  // accounts on one browser can't see each other's practice either. Cloud sync
  // stays gated on `isAuthenticated` below.
  //
  // Declared before the sync effect so the scope is already correct by the
  // time anything reads or pulls. Switching scope here also runs the one-time
  // legacy migration and the guest-progress claim.
  useEffect(() => {
    setActiveSyncUid(user?.uid || null);
  }, [user?.uid]);

  useEffect(() => {
    if (!isAuthenticated || !user?.uid) {
      return undefined;
    }

    let cancelled = false;
    const scopeToken = captureScopeToken();

    setSyncing(true);
    pullAndMergeProgress(user.uid)
      .then(() => {
        if (!cancelled && isScopeTokenCurrent(scopeToken)) {
          window.dispatchEvent(new CustomEvent("fp-progress-synced"));
        }
      })
      .catch((error) => {
        console.error("Failed to load cloud progress:", error);
      })
      .finally(() => {
        if (!cancelled) setSyncing(false);
      });

    // Independent of cloud progress sync — a failure there (e.g. malformed
    // legacy progress data) should never block badge minting.
    syncBadgesToCloud(user.uid);

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.uid]);

  useEffect(() => {
    if (!isAuthenticated || !user?.uid) return undefined;

    let detached = false;

    function handleProgressChanged() {
      scheduleCloudSync(user.uid);
      syncBadgesToCloud(user.uid);
    }

    // A tab can become visible again after the user has signed out or
    // switched accounts in another tab. `pullAndMergeProgress` refuses to
    // persist anything once the identity has moved on, but this handler also
    // has to stop announcing a sync that no longer belongs to anyone.
    function handleVisibilityChange() {
      if (document.visibilityState !== "visible") return;

      const scopeToken = captureScopeToken();

      pullAndMergeProgress(user.uid)
        .then(() => {
          if (detached || !isScopeTokenCurrent(scopeToken)) return;
          window.dispatchEvent(new CustomEvent("fp-progress-synced"));
        })
        .catch((error) => {
          console.error("Failed to refresh cloud progress:", error);
        });
    }

    window.addEventListener("fp-progress-changed", handleProgressChanged);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      detached = true;
      window.removeEventListener("fp-progress-changed", handleProgressChanged);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, user?.uid]);

  return (
    <ProgressSyncContext.Provider value={{ syncing }}>
      {children}
    </ProgressSyncContext.Provider>
  );
}

export function useProgressSync() {
  return useContext(ProgressSyncContext);
}
