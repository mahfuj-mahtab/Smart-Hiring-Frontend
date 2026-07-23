import { headers } from "next/headers";
import {
  getAccessToken,
  getOrgSlug,
  COOKIE_NAMES,
} from "@/lib/auth/cookies";

export async function getAuthHeaders() {
  const headersList = await headers();
  const token = await getAccessToken();
  const orgSlug =
    headersList.get("x-org-slug") || (await getOrgSlug());

  const result = {};
  if (token) {
    result.Authorization = `Bearer ${token}`;
  }
  if (orgSlug) {
    result["X-Organization-Slug"] = orgSlug;
  }
  return result;
}

export { COOKIE_NAMES };
