import { apiGet } from "@/lib/api/client";
import { publicApiGet } from "@/lib/api/public-client";

export async function getOrganization() {
  return apiGet("/organization/", null, { next: { tags: ["organization"] } });
}

export async function getPublicOrganization() {
  return publicApiGet("/public/organization/");
}
