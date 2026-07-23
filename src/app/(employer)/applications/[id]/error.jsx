"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/feedback/ErrorAlert";
import { ROUTES } from "@/constants/routes";

export default function ApplicationReviewError({ error, reset }) {
  return (
    <div className="space-y-6">
      <ErrorAlert message={error?.message || "Failed to load application"} />
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline" className="rounded-xl">
          Try again
        </Button>
        <Button asChild variant="gradient" className="rounded-xl">
          <Link href={ROUTES.APPLICATIONS}>Back to applications</Link>
        </Button>
      </div>
    </div>
  );
}
