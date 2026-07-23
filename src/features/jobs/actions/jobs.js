"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/errors";
import { apiPost, apiPatch, apiDelete } from "@/lib/api/client";
import {
  jobCreateSchema,
  jobUpdateSchema,
} from "@/features/jobs/validations/schemas";
import { ROUTES } from "@/constants/routes";
import { MESSAGES } from "@/constants/messages";
import {
  formatZodErrors,
  formatApiErrors,
  isNextNavigationError,
} from "@/lib/server-actions";

export async function createJobAction(prevState, formData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location") || "",
    department: formData.get("department") || "",
    employment_type: formData.get("employment_type"),
    work_mode: formData.get("work_mode"),
    experience_level: formData.get("experience_level"),
    salary_min: formData.get("salary_min") || null,
    salary_max: formData.get("salary_max") || null,
    salary_currency: formData.get("salary_currency") || "USD",
    requirements: formData.get("requirements") || "",
    responsibilities: formData.get("responsibilities") || "",
    benefits: formData.get("benefits") || "",
    application_deadline: formData.get("application_deadline") || null,
    vacancies: formData.get("vacancies") || "1",
    status: formData.get("status") || "draft",
  };

  const parsed = jobCreateSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    await apiPost("/jobs/", parsed.data);
    revalidatePath(ROUTES.JOBS);
    revalidateTag("jobs");
    redirect(ROUTES.JOBS);
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError, {
      limitMessage: MESSAGES.jobs.limitReached,
    });
    return { success: false, message, fieldErrors };
  }
}

export async function updateJobAction(prevState, formData) {
  const id = formData.get("id");
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location") || "",
    department: formData.get("department") || "",
    employment_type: formData.get("employment_type"),
    work_mode: formData.get("work_mode"),
    experience_level: formData.get("experience_level"),
    salary_min: formData.get("salary_min") || null,
    salary_max: formData.get("salary_max") || null,
    salary_currency: formData.get("salary_currency") || "USD",
    requirements: formData.get("requirements") || "",
    responsibilities: formData.get("responsibilities") || "",
    benefits: formData.get("benefits") || "",
    application_deadline: formData.get("application_deadline") || null,
    vacancies: formData.get("vacancies") || "1",
    status: formData.get("status"),
  };

  const parsed = jobUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  try {
    await apiPatch(`/jobs/${id}/`, parsed.data);
    revalidatePath(ROUTES.JOBS);
    revalidatePath(`${ROUTES.JOBS}/${id}/edit`);
    revalidateTag("jobs");
    revalidateTag(`job-${id}`);
    redirect(ROUTES.JOBS);
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}

export async function deleteJobAction(id) {
  try {
    await apiDelete(`/jobs/${id}/`);
    revalidatePath(ROUTES.JOBS);
    revalidateTag("jobs");
    return { success: true };
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message } = formatApiErrors(error, ApiError);
    return { success: false, message };
  }
}

export async function publishJobAction(id) {
  try {
    await apiPatch(`/jobs/${id}/`, { status: "open" });
    revalidatePath(ROUTES.JOBS);
    revalidateTag("jobs");
    revalidateTag(`job-${id}`);
    return { success: true };
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message } = formatApiErrors(error, ApiError);
    return { success: false, message };
  }
}

export async function closeJobAction(id) {
  try {
    await apiPatch(`/jobs/${id}/`, { status: "closed" });
    revalidatePath(ROUTES.JOBS);
    revalidateTag("jobs");
    revalidateTag(`job-${id}`);
    return { success: true };
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message } = formatApiErrors(error, ApiError);
    return { success: false, message };
  }
}
