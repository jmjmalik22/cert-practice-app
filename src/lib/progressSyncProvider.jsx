import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext.jsx";
import { pullAndMergeProgress, scheduleCloudSync, setActiveSyncUid } from "./progressSync.js";

const ProgressSyncContext = createContext({ syncing: false });

export function ProgressSyncProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.uid) {
      setActiveSyncUid(null);
      return undefined;
    }

    setActiveSyncUid(user.uid);
    let cancelled = false;

    setSyncing(true);
    pullAndMergeProgress(user.uid)
      .then(() => {
        if (!cancelled) {
          window.dispatchEvent(new CustomEvent("fp-progress-synced"));
        }
      })
      .catch((error) => {
        console.error("Failed to load cloud progress:", error);
      })
      .finally(() => {
        if (!cancelled) setSyncing(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.uid]);

  useEffect(() => {
    if (!isAuthenticated || !user?.uid) return undefined;

    function handleProgressChanged() {
      scheduleCloudSync(user.uid);
    }

    function handleVisibilityChange() {
      if (document.visibilityState !== "visible") return;

      pullAndMergeProgress(user.uid)
        .then(() => {
          window.dispatchEvent(new CustomEvent("fp-progress-synced"));
        })
        .catch((error) => {
          console.error("Failed to refresh cloud progress:", error);
        });
    }

    window.addEventListener("fp-progress-changed", handleProgressChanged);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
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
