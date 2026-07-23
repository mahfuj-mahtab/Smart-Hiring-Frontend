"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, ApiErrorBanner } from "@/components/forms/FormField";
import { loginAction } from "@/features/auth/actions/auth";
import { loginSchema } from "@/features/auth/validations/schemas";
import { ROUTES } from "@/constants/routes";

export function LoginForm({ nextUrl }) {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form action={formAction} className="space-y-4">
      {nextUrl && <input type="hidden" name="next" value={nextUrl} />}
      <ApiErrorBanner
        message={state?.message}
        fieldErrors={state?.fieldErrors}
      />

      <FormField label="Username" name="username" error={errors.username?.message} required>
        <Input id="username" {...register("username")} autoComplete="username" />
      </FormField>

      <FormField label="Password" name="password" error={errors.password?.message} required>
        <Input
          id="password"
          type="password"
          {...register("password")}
          autoComplete="current-password"
        />
      </FormField>

      <Button type="submit" className="w-full rounded-xl" variant="gradient" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href={ROUTES.REGISTER} className="text-primary hover:underline">
          Register as employer
        </Link>{" "}
        or{" "}
        <Link href={ROUTES.REGISTER_CANDIDATE} className="text-primary hover:underline">
          Register as candidate
        </Link>
      </p>
    </form>
  );
}
