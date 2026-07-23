import { apiGet } from "@/lib/api/client";

export async function getCandidateProfile() {
  return apiGet("/candidate/me/", null, { next: { tags: ["candidate-me"] } });
}
