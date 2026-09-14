import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

// Shown whenever someone tries to leave a Mock or Shield exam mid-sitting —
// by clicking a nav link, using the browser's back/forward, closing the tab,
// or refreshing — so an in-progress attempt is never lost silently.
export const EXAM_EXIT_WARNING =
  "You have an exam in progress. Leaving now will lose your answers for this attempt. Continue?";

// Guards an in-progress exam sitting against accidental navigation. Pass
// `active` as true only while the learner is actively answering questions
// (not on the setup screen, and not once results are shown) so this never
// blocks the exit paths that don't lose anything.
//
// Covers two distinct escape routes:
// - In-app navigation (header links, browser back/forward) goes through
//   React Router, so `useBlocker` can intercept it and ask for confirmation
//   before the route actually changes.
// - Closing the tab or refreshing bypasses the router entirely, so a
//   `beforeunload` listener is the only way to warn there.
export function useExamExitGuard(active) {
  const blocker = useBlocker(active);

  useEffect(() => {
    if (blocker.state !== "blocked") return;
    if (window.confirm(EXAM_EXIT_WARNING)) {
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker]);

  useEffect(() => {
    if (!active) return undefined;
    function handleBeforeUnload(e) {
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [active]);
}
