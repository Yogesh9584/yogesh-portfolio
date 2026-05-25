import { useCallback, useState } from "react";

const TOAST_DURATION_MS = 5000;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((type, message) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());

    setToasts((current) => [...current, { id, type, message }]);

    window.setTimeout(() => dismiss(id), TOAST_DURATION_MS);

    return id;
  }, [dismiss]);

  const success = useCallback(
    (message) => push("success", message),
    [push]
  );

  const error = useCallback(
    (message) => push("error", message),
    [push]
  );

  return { toasts, dismiss, success, error };
}
