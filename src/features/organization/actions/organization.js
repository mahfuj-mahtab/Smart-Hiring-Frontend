"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { ApiError } from "@/lib/api/errors";
import { apiPatchForm } from "@/lib/api/client";
import { ROUTES } from "@/constants/routes";
import { MESSAGES } from "@/constants/messages";
import { organizationUpdateSchema } from "@/features/organization/validations/schemas";
import {
  formatZodErrors,
  formatApiErrors,
  isNextNavigationError,
} from "@/lib/server-actions";

const MAX_LOGO_SIZE = 2 * 1024 * 1024;
const MAX_BANNER_SIZE = 5 * 1024 * 1024;

export async function updateOrganizationAction(prevState, formData) {
  const raw = {
    name: formData.get("name"),
    industry: formData.get("industry") || "",
    employee_size: formData.get("employee_size") || "",
  };

  const parsed = organizationUpdateSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, fieldErrors: formatZodErrors(parsed.error) };
  }

  const logo = formData.get("logo");
  const banner = formData.get("banner");

  if (logo instanceof File && logo.size > 0) {
    if (logo.size > MAX_LOGO_SIZE) {
      return {
        success: false,
        fieldErrors: { logo: "Logo must be 2 MB or smaller." },
      };
    }
  }

  if (banner instanceof File && banner.size > 0) {
    if (banner.size > MAX_BANNER_SIZE) {
      return {
        success: false,
        fieldErrors: { banner: "Banner must be 5 MB or smaller." },
      };
    }
  }

  const uploadData = new FormData();
  uploadData.append("name", parsed.data.name);
  uploadData.append("industry", parsed.data.industry || "");
  if (parsed.data.employee_size) {
    uploadData.append("employee_size", parsed.data.employee_size);
  }
  if (logo instanceof File && logo.size > 0) {
    uploadData.append("logo", logo);
  }
  if (banner instanceof File && banner.size > 0) {
    uploadData.append("banner", banner);
  }

  try {
    await apiPatchForm("/organization/", uploadData);
    revalidateTag("organization");
    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.CAREERS);
    revalidatePath(ROUTES.ORGANIZATION_SETTINGS);
    return { success: true, message: MESSAGES.organization.updated };
  } catch (error) {
    if (isNextNavigationError(error)) throw error;
    const { message, fieldErrors } = formatApiErrors(error, ApiError);
    return { success: false, message, fieldErrors };
  }
}
