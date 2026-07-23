"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api/errors";
import { setAuthCookies, clearAuthCookies } from "@/lib/auth/cookies";
import { apiGet } from "@/lib/api/client";
import {
  loginApi,
  registerEmployerApi,
  registerCandidateApi,
} from "@/features/auth/api/auth";
import {
  loginSchema,
  registerEmployerSchema,
  registerCandidateSchema,
} from "@/features/auth/validations/schemas";
import {
  formatZodErrors,
  formatApiErrors,
  isNextNavigationError,
} from "@/lib/server-actions";

export async function loginAction(prevState, formData) {
  const raw = Object.fromEntries(formData);
  const nextUrl = raw.next || null;
  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    const { data } = await loginApi(parsed.data);
    const tokens = data.tokens;

    await setAuthCookies({
      access: tokens.access,
      refresh: tokens.refresh,
    });

    const candidateRes = await apiGet("/candidate/me/").catch(() => null);
    if (candidateRes?.data) {
      await setAuthCookies({
        access: tokens.access,
        refresh: tokens.refresh,
        accountType: "candidate",
      });
      redirect(nextUrl || "/candidate/profile");
    }

    const meRes = await apiGet("/me/").catch(() => null);
    if (meRes?.data) {
      await setAuthCookies({
        access: tokens.access,
        refresh: tokens.refresh,
        accountType: "employer",
        orgSlug: meRes.data.organization?.slug,
      });
      redirect(nextUrl || "/dashboard");
    }

    return {
      success: false,
      message:
        "Employer login requires organization context. Use your organization subdomain or register first.",
    };
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}

export async function registerEmployerAction(prevState, formData) {
  const raw = Object.fromEntries(formData);
  const parsed = registerEmployerSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    const { data } = await registerEmployerApi(parsed.data);
    const tokens = data.tokens;

    await setAuthCookies({
      access: tokens.access,
      refresh: tokens.refresh,
      accountType: "employer",
      orgSlug: data.organization.slug,
    });

    redirect("/dashboard");
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}

export async function registerCandidateAction(prevState, formData) {
  const raw = Object.fromEntries(formData);
  const parsed = registerCandidateSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    const { data } = await registerCandidateApi(parsed.data);
    const tokens = data.tokens;

    await setAuthCookies({
      access: tokens.access,
      refresh: tokens.refresh,
      accountType: "candidate",
    });

    redirect("/candidate/profile");
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}

export async function logoutAction() {
  await clearAuthCookies();
  revalidatePath("/", "layout");
  redirect("/login");
}
