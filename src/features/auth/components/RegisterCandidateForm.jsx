"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, ApiErrorBanner } from "@/components/forms/FormField";
import { registerCandidateAction } from "@/features/auth/actions/auth";
import { registerCandidateSchema } from "@/features/auth/validations/schemas";
import { ROUTES } from "@/constants/routes";
import { useActionToast } from "@/lib/hooks/use-action-toast";
import { MESSAGES } from "@/constants/messages";

export function RegisterCandidateForm() {
  const [state, formAction, pending] = useActionState(registerCandidateAction, null);

  useActionToast(state, { successMessage: MESSAGES.auth.registerSuccess });
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerCandidateSchema),
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

      <FormField label="Phone" name="phone" error={errors.phone?.message}>
        <Input id="phone" type="tel" {...register("phone")} />
      </FormField>

      <Button type="submit" className="w-full rounded-xl" variant="gradient" disabled={pending}>
        {pending ? "Creating account..." : "Create candidate account"}
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
