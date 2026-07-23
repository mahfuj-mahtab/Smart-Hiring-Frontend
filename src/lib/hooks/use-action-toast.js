"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

function firstFieldError(fieldErrors) {
  if (!fieldErrors) return null;
  for (const value of Object.values(fieldErrors)) {
    const text = Array.isArray(value) ? value[0] : value;
    if (text) return text;
  }
  return null;
}

export function useActionToast(state, { successMessage } = {}) {
  const lastKey = useRef(null);

  useEffect(() => {
    if (!state) return;

    const key = JSON.stringify({
      success: state.success,
      message: state.message,
      fieldErrors: state.fieldErrors,
    });
    if (key === lastKey.current) return;
    lastKey.current = key;

    if (state.success === false) {
      const message = state.message || firstFieldError(state.fieldErrors);
      if (message) toast.error(message);
      return;
    }

    const message = state.message || successMessage;
    if (message) toast.success(message);
  }, [state, successMessage]);
}
