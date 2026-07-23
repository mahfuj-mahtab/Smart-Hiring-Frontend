"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/errors";
import { apiPost, apiPatch, apiDelete } from "@/lib/api/client";
import { roleSchema } from "@/features/auth/validations/schemas";
import { ROUTES } from "@/constants/routes";
import {
  formatZodErrors,
  formatApiErrors,
  isNextNavigationError,
} from "@/lib/server-actions";

export async function createRoleAction(prevState, formData) {
  const permissionIds = formData.getAll("permission_ids");
  const raw = {
    name: formData.get("name"),
    permission_ids: permissionIds,
  };

  const parsed = roleSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    await apiPost("/roles/", parsed.data);
    revalidatePath(ROUTES.ROLES);
    revalidateTag("roles");
    redirect(ROUTES.ROLES);
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}

export async function updateRoleAction(prevState, formData) {
  const id = formData.get("id");
  const permissionIds = formData.getAll("permission_ids");
  const raw = {
    name: formData.get("name"),
    permission_ids: permissionIds,
  };

  const parsed = roleSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    await apiPatch(`/roles/${id}/`, parsed.data);
    revalidatePath(ROUTES.ROLES);
    revalidatePath(`${ROUTES.ROLES}/${id}/edit`);
    revalidateTag("roles");
    revalidateTag(`role-${id}`);
    redirect(ROUTES.ROLES);
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}

export async function deleteRoleAction(id) {
  try {
    await apiDelete(`/roles/${id}/`);
    revalidatePath(ROUTES.ROLES);
    revalidateTag("roles");
    return { success: true };
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message } = formatApiErrors(error, ApiError);
    return { success: false, message };
  }
}
