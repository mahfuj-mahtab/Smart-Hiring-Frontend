"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, ApiErrorBanner } from "@/components/forms/FormField";
import { registerEmployerAction } from "@/features/auth/actions/auth";
import { registerEmployerSchema } from "@/features/auth/validations/schemas";
import { ROUTES } from "@/constants/routes";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { MESSAGES } from "@/constants/messages";

export function RegisterEmployerForm() {
  const [state, formAction, pending] = useActionState(registerEmployerAction, null);

  useActionToast(state, { successMessage: MESSAGES.auth.registerSuccess });
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerEmployerSchema),
  });

  return (
    <form action={formAction} className="space-y-4">
      <ApiErrorBanner
        message={state?.message}
        fieldErrors={state?.fieldErrors}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="First name" name="first_name" error={errors.first_name?.message}>
          <Input id="first_name" {...register("first_name")} />
        </FormField>
        <FormField label="Last name" name="last_name" error={errors.last_name?.message}>
          <Input id="last_name" {...register("last_name")} />
        </FormField>
      </div>

      <FormField label="Email" name="email" error={errors.email?.message} required>
        <Input id="email" type="email" {...register("email")} />
      </FormField>

      <FormField label="Username" name="username" error={errors.username?.message} required>
        <Input id="username" {...register("username")} />
      </FormField>

      <FormField label="Password" name="password" error={errors.password?.message} required>
        <Input id="password" type="password" {...register("password")} />
      </FormField>

      <FormField
        label="Organization name"
        name="organization_name"
        error={errors.organization_name?.message}
        required
      >
        <Input id="organization_name" {...register("organization_name")} />
      </FormField>

      <FormField
        label="Subdomain"
        name="organization_slug"
        error={errors.organization_slug?.message}
        required
      >
        <div className="flex items-center gap-2">
          <Input id="organization_slug" {...register("organization_slug")} />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            .localhost
          </span>
        </div>
      </FormField>

      <Button type="submit" className="w-full rounded-xl" variant="gradient" disabled={pending}>
        {pending ? "Creating account..." : "Create employer account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
