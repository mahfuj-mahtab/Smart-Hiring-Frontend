"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { FormField, ApiErrorBanner } from "@/components/forms/FormField";
import { FormSection } from "@/components/forms/FormSection";
import { UserEmailLookup, SelectedUserCard } from "@/features/members/components/UserEmailLookup";
import { CreateEmployerUserFields } from "@/features/members/components/CreateEmployerUserFields";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { MESSAGES } from "@/constants/messages";

export function MemberForm({ action, member, roles, isEdit = false }) {
  const [state, formAction, pending] = useActionState(action, null);
  const [lookupResult, setLookupResult] = useState(null);

  useActionToast(state, {
    successMessage: isEdit ? MESSAGES.members.updated : MESSAGES.members.created,
  });

  const canSubmitCreate =
    lookupResult?.status === "found" || lookupResult?.status === "not_found";

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {member?.id && <input type="hidden" name="id" value={member.id} />}

      <ApiErrorBanner message={state?.message} fieldErrors={state?.fieldErrors} />

      <FormSection
        title={isEdit ? "Member details" : "Add team member"}
        description={
          isEdit
            ? "Update role and status for this member."
            : "Search by email to add an existing user or create a new employer account."
        }
      >
        {!isEdit && (
          <>
            <UserEmailLookup onResult={setLookupResult} />

            {lookupResult?.status === "found" && (
              <>
                <SelectedUserCard user={lookupResult.user} />
                <input type="hidden" name="user" value={lookupResult.user.id} />
              </>
            )}

            {lookupResult?.status === "not_found" && (
              <CreateEmployerUserFields
                email={lookupResult.email}
                fieldErrors={state?.fieldErrors}
              />
            )}
          </>
        )}

        {(isEdit || canSubmitCreate) && (
          <>
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
          </>
        )}
      </FormSection>

      {(isEdit || canSubmitCreate) && (
        <Button type="submit" disabled={pending} variant="gradient" className="rounded-xl">
          {pending ? "Saving..." : isEdit ? "Update member" : "Add member"}
        </Button>
      )}
    </form>
  );
}
