"use client";

import { Input } from "@/components/ui/input";
import { FormField } from "@/components/forms/FormField";

export function CreateEmployerUserFields({ email, fieldErrors = {} }) {
  return (
    <div className="space-y-4 rounded-xl border border-border/60 bg-muted/20 p-5">
      <div>
        <h3 className="text-sm font-semibold">Create new user</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          No account found for this email. Create one and add them to your organization.
        </p>
      </div>

      <input type="hidden" name="new_user_email" value={email} />

      <FormField
        label="Email"
        name="new_user_email_display"
        error={fieldErrors?.["new_user.email"]}
      >
        <Input
          id="new_user_email_display"
          type="email"
          value={email}
          readOnly
          className="rounded-lg bg-muted/40"
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="First name"
          name="new_user_first_name"
          error={fieldErrors?.["new_user.first_name"]}
        >
          <Input id="new_user_first_name" name="new_user_first_name" className="rounded-lg" />
        </FormField>
        <FormField
          label="Last name"
          name="new_user_last_name"
          error={fieldErrors?.["new_user.last_name"]}
        >
          <Input id="new_user_last_name" name="new_user_last_name" className="rounded-lg" />
        </FormField>
      </div>

      <FormField
        label="Username"
        name="new_user_username"
        error={fieldErrors?.["new_user.username"]}
        required
      >
        <Input
          id="new_user_username"
          name="new_user_username"
          required
          className="rounded-lg"
        />
      </FormField>

      <FormField
        label="Password"
        name="new_user_password"
        error={fieldErrors?.["new_user.password"]}
        required
      >
        <Input
          id="new_user_password"
          name="new_user_password"
          type="password"
          required
          minLength={8}
          className="rounded-lg"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">Minimum 8 characters.</p>
      </FormField>
    </div>
  );
}
