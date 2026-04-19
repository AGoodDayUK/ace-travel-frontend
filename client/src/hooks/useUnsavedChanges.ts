import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether a form has unsaved changes and provides:
 * - `isDirty`: true once the user has made any change
 * - `markDirty()`: call whenever a field changes
 * - `markClean()`: call after a successful save
 * - `confirmLeave`: when true, show the "unsaved changes" dialog
 * - `handleNavigate(fn)`: wraps any navigation action — shows the dialog if dirty
 * - `onConfirmLeave()`: user confirmed they want to leave; runs the pending navigation
 * - `onCancelLeave()`: user chose to stay; dismisses the dialog
 *
 * Also hooks into the browser's `beforeunload` event so closing/refreshing the tab
 * also triggers the native browser warning when there are unsaved changes.
 */
export function useUnsavedChanges() {
  const [isDirty, setIsDirty] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const pendingAction = useRef<(() => void) | null>(null);

  // Browser tab close / refresh warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const markDirty = () => setIsDirty(true);
  const markClean = () => {
    setIsDirty(false);
    setConfirmLeave(false);
    pendingAction.current = null;
  };

  /**
   * Wrap any navigation or close action.
   * If the form is dirty, shows the confirmation dialog instead of running immediately.
   */
  const handleNavigate = (action: () => void) => {
    if (!isDirty) {
      action();
      return;
    }
    pendingAction.current = action;
    setConfirmLeave(true);
  };

  const onConfirmLeave = () => {
    setConfirmLeave(false);
    setIsDirty(false);
    if (pendingAction.current) {
      pendingAction.current();
      pendingAction.current = null;
    }
  };

  const onCancelLeave = () => {
    setConfirmLeave(false);
    pendingAction.current = null;
  };

  return { isDirty, markDirty, markClean, confirmLeave, handleNavigate, onConfirmLeave, onCancelLeave };
}
