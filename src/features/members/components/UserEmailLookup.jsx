"use client";

import { useState, useTransition } from "react";
import { Search, UserCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/forms/FormField";
import { lookupUserByEmailAction } from "@/features/members/actions/members";

const STATUS_MESSAGES = {
  already_member: "This user is already a member of your organization.",
  invalid_account: "This email belongs to a candidate account and cannot be added as a member.",
};

export function UserEmailLookup({ onResult }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  const handleSearch = () => {
    setError(null);
    if (!email.trim()) {
      setError("Enter an email address to search.");
      toast.error("Enter an email address to search.");
      return;
    }

    startTransition(async () => {
      const result = await lookupUserByEmailAction(email.trim());
      if (!result.success) {
        const message = result.message || "Search failed. Please try again.";
        setError(message);
        toast.error(message);
        onResult(null);
        return;
      }

      const { data } = result;
      if (data.status === "found") {
        onResult({ status: "found", user: data.user, email: email.trim() });
        return;
      }

      if (data.status === "not_found") {
        onResult({ status: "not_found", email: email.trim() });
        return;
      }

      const message = STATUS_MESSAGES[data.status] || "This user cannot be added.";
      setError(message);
      toast.error(message);
      onResult(null);
    });
  };

  return (
    <div className="space-y-4">
      <FormField label="Email" name="lookup_email" error={error} required>
        <div className="flex gap-2">
          <Input
            id="lookup_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@company.com"
            className="rounded-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleSearch}
            disabled={pending}
            className="shrink-0 rounded-lg"
          >
            <Search className="h-4 w-4" />
            {pending ? "Searching..." : "Search"}
          </Button>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Search by email to link an existing employer account or create a new one.
        </p>
      </FormField>
    </div>
  );
}

export function SelectedUserCard({ user }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
      <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
      <div>
        <p className="font-medium">{user.full_name || user.username}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="mt-1 text-xs text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  );
}

export function LookupErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-destructive">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
