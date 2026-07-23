"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api/errors";
import { apiPostForm } from "@/lib/api/client";
import { ROUTES } from "@/constants/routes";
import { MESSAGES } from "@/constants/messages";
import { formatApiErrors, isNextNavigationError } from "@/lib/server-actions";

export async function applyToJobAction(prevState, formData) {
  const jobId = formData.get("job_id");
  const cv = formData.get("cv");

  if (!cv || !(cv instanceof File) || cv.size === 0) {
    return { success: false, fieldErrors: { cv: "Please upload your CV/resume" } };
  }

  if (cv.size > 5 * 1024 * 1024) {
    return { success: false, fieldErrors: { cv: "CV must be 5MB or smaller" } };
  }

  const uploadData = new FormData();
  uploadData.append("job", jobId);
  uploadData.append("cover_letter", formData.get("cover_letter") || "");
  uploadData.append("phone", formData.get("phone") || "");
  uploadData.append("linkedin_url", formData.get("linkedin_url") || "");
  uploadData.append("portfolio_url", formData.get("portfolio_url") || "");
  const years = formData.get("years_of_experience");
  if (years) uploadData.append("years_of_experience", years);
  uploadData.append("cv", cv);

  try {
    await apiPostForm("/applications/", uploadData);
    revalidatePath(`${ROUTES.CAREERS}/${jobId}`);
    return { success: true, message: MESSAGES.applications.applied };
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}
