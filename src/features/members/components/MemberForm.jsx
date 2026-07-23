"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { FormField, ApiErrorBanner } from "@/components/forms/FormField";
import { FormSection } from "@/components/forms/FormSection";

export function MemberForm({ action, member, roles, isEdit = false }) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {member?.id && <input type="hidden" name="id" value={member.id} />}

      <ApiErrorBanner message={state?.message} fieldErrors={state?.fieldErrors} />

      <FormSection
        title={isEdit ? "Member details" : "Add team member"}
        description={
          isEdit
            ? "Update role and status for this member."
            : "Link an existing employer account to your organization."
        }
      >
        {!isEdit && (
          <FormField
            label="User ID"
            name="user"
            error={state?.fieldErrors?.user}
            required
          >
            <Input
              id="user"
              name="user"
              placeholder="UUID of existing employer user"
              required
              className="rounded-lg"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Enter the UUID of an existing employer account to add to your organization.
            </p>
          </FormField>
        )}

        <FormField label="Role" name="role" error={state?.fieldErrors?.role} required>
          <NativeSelect
            id="role"
            name="role"
            defaultValue={member?.role || ""}
            required
          >
            <option value="" disabled>
              Select a role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </NativeSelect>
        </FormField>

        <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-3">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            defaultChecked={member?.is_active !== false}
            className="h-4 w-4 rounded border border-input accent-primary"
          />
          <Label htmlFor="is_active" className="font-normal">
            Active member
          </Label>
        </div>
      </FormSection>

      <Button type="submit" disabled={pending} variant="gradient" className="rounded-xl">
        {pending ? "Saving..." : isEdit ? "Update member" : "Add member"}
      </Button>
    </form>
  );
}
