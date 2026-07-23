"use client";

import { ErrorAlert } from "@/components/feedback/ErrorAlert";

export default function ApplicationsError({ error, reset }) {
  return (
    <ErrorAlert
      title="Failed to load applications"
      message={error?.message || "Something went wrong"}
      onRetry={reset}
    />
  );
}
