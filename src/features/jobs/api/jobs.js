import { apiGet } from "@/lib/api/client";

export async function getJobs(params) {
  return apiGet("/jobs/", params, { next: { tags: ["jobs"] } });
}

export async function getJob(id) {
  return apiGet(`/jobs/${id}/`, null, { next: { tags: [`job-${id}`] } });
}
