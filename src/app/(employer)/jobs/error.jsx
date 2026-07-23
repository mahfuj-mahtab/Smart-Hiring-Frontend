"use client";

import { ErrorAlert } from "@/components/feedback/ErrorAlert";

export default function JobsError({ error, reset }) {
  return (
    <ErrorAlert
      title="Failed to load jobs"
      message={error?.message || "Something went wrong"}
      onRetry={reset}
    />
  );
}
