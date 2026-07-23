"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/errors";
import { apiPost, apiPatch } from "@/lib/api/client";
import {
  memberCreateSchema,
  memberUpdateSchema,
} from "@/features/auth/validations/schemas";
import { ROUTES } from "@/constants/routes";
import { MESSAGES } from "@/constants/messages";
import {
  formatZodErrors,
  formatApiErrors,
  isNextNavigationError,
} from "@/lib/server-actions";

export async function createMemberAction(prevState, formData) {
  const raw = {
    user: formData.get("user"),
    role: formData.get("role"),
    is_active: formData.get("is_active") === "on",
  };

  const parsed = memberCreateSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    await apiPost("/members/", parsed.data);
    revalidatePath(ROUTES.MEMBERS);
    revalidateTag("members");
    redirect(ROUTES.MEMBERS);
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError, {
      limitMessage: MESSAGES.members.limitReached,
    });
    return { success: false, message, fieldErrors };
  }
}

export async function updateMemberAction(prevState, formData) {
  const id = formData.get("id");
  const raw = {
    role: formData.get("role"),
    is_active: formData.get("is_active") === "on",
  };

  const parsed = memberUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    await apiPatch(`/members/${id}/`, parsed.data);
    revalidatePath(ROUTES.MEMBERS);
    revalidateTag("members");
    revalidateTag(`member-${id}`);
    redirect(ROUTES.MEMBERS);
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}

export async function deactivateMemberAction(id) {
  try {
    await apiPatch(`/members/${id}/`, { is_active: false });
    revalidatePath(ROUTES.MEMBERS);
    revalidateTag("members");
    return { success: true };
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message } = formatApiErrors(error, ApiError);
    return { success: false, message };
  }
}
