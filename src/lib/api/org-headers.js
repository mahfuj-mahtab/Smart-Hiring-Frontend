import { headers } from "next/headers";
import { getOrgSlug } from "@/lib/auth/cookies";

export async function getOrgHeaders() {
  const headersList = await headers();
  const orgSlug = headersList.get("x-org-slug") || (await getOrgSlug());
  const result = {};
  if (orgSlug) {
    result["X-Organization-Slug"] = orgSlug;
  }
  return result;
}
