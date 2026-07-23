"use client";

import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/feedback/ErrorAlert";
import { MESSAGES } from "@/constants/messages";

export default function MembersError({ error, reset }) {
  return (
    <div className="space-y-4">
      <ErrorAlert message={error?.message || MESSAGES.common.error} />
      <Button onClick={reset}>{MESSAGES.common.retry}</Button>
    </div>
  );
}
