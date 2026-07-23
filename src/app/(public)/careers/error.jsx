"use client";

import { ErrorAlert } from "@/components/feedback/ErrorAlert";

export default function CareersError({ error, reset }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <ErrorAlert
        title="Careers page unavailable"
        message={
          error?.message ||
          "Organization not found. Visit this page on your company subdomain."
        }
        onRetry={reset}
      />
    </div>
  );
}
