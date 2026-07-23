import { publicApiGet } from "@/lib/api/public-client";

export async function getPublicJobs() {
  return publicApiGet("/public/jobs/");
}

export async function getPublicJob(id) {
  return publicApiGet(`/public/jobs/${id}/`);
}
