export function isNextNavigationError(error) {
  if (!error || typeof error !== "object") return false;
  const digest = error.digest;
  return (
    digest === "NEXT_REDIRECT" ||
    digest === "NEXT_NOT_FOUND" ||
    (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT"))
  );
}

export function formatZodErrors(error) {
  const fieldErrors = {};
  error.issues.forEach((issue) => {
    fieldErrors[issue.path.join(".")] = issue.message;
  });
  return fieldErrors;
}

export function formatApiErrors(error, ApiError, options = {}) {
  const { fallbackMessage = "Something went wrong", limitMessage } =
    typeof options === "string" ? { fallbackMessage: options } : options;

  if (error instanceof ApiError) {
    let message = error.message;
    if (
      limitMessage &&
      (message?.toLowerCase().includes("limit") ||
        message?.toLowerCase().includes("subscription"))
    ) {
      message = limitMessage;
    }
    return { message, fieldErrors: error.getFieldErrors() };
  }
  return { message: fallbackMessage, fieldErrors: {} };
}
