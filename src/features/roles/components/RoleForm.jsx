"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, ApiErrorBanner } from "@/components/forms/FormField";
import { FormSection } from "@/components/forms/FormSection";
import { roleSchema } from "@/features/auth/validations/schemas";
import { PermissionMatrix } from "./PermissionMatrix";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { MESSAGES } from "@/constants/messages";

export function RoleForm({ action, role, permissions, readOnly = false }) {
  const [state, formAction, pending] = useActionState(action, null);
  const selectedIds = role?.permissions?.map((p) => p.id) || [];

  useActionToast(state, {
    successMessage: role ? MESSAGES.roles.updated : MESSAGES.roles.created,
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: role?.name || "" },
  });

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      {role?.id && <input type="hidden" name="id" value={role.id} />}

      <ApiErrorBanner message={state?.message} fieldErrors={state?.fieldErrors} />

      <FormSection title="Role details" description="Name this role for your organization.">
        <FormField label="Role name" name="name" error={errors.name?.message} required>
          <Input
            id="name"
            {...register("name")}
            defaultValue={role?.name}
            disabled={readOnly}
            className="rounded-lg"
          />
        </FormField>
      </FormSection>

      <FormSection
        title="Permissions"
        description="Choose what members with this role can access and modify."
      >
        <PermissionMatrix
          modules={permissions}
          selectedIds={selectedIds}
          disabled={readOnly}
        />
      </FormSection>

      {!readOnly && (
        <Button type="submit" disabled={pending} variant="gradient" className="rounded-xl">
          {pending ? "Saving..." : role ? "Update role" : "Create role"}
        </Button>
      )}
    </form>
  );
}
