"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiError } from "@/lib/api/errors";
import { apiPatch } from "@/lib/api/client";
import { ROUTES } from "@/constants/routes";

function formatApiErrors(error) {
  if (error instanceof ApiError) {
    return { message: error.message, fieldErrors: error.getFieldErrors() };
  }
  return { message: "Something went wrong", fieldErrors: {} };
}

function revalidateApplication(id) {
  revalidatePath(ROUTES.APPLICATIONS);
  revalidatePath(ROUTES.applicationDetail(id));
  revalidateTag("applications");
  revalidateTag(`application-${id}`);
}

export async function updateApplicationStageAction(id, stage) {
  try {
    await apiPatch(`/applications/${id}/`, { stage });
    revalidateApplication(id);
    return { success: true };
  } catch (error) {
    const { message } = formatApiErrors(error);
    return { success: false, message };
  }
}

export async function toggleShortlistAction(id, isShortlisted) {
  try {
    await apiPatch(`/applications/${id}/`, { is_shortlisted: isShortlisted });
    revalidateApplication(id);
    return { success: true, isShortlisted };
  } catch (error) {
    const { message } = formatApiErrors(error);
    return { success: false, message };
  }
}
