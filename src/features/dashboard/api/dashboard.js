import { apiGet } from "@/lib/api/client";

export async function getEmployerMe() {
  return apiGet("/me/", null, { next: { tags: ["me"] } });
}
