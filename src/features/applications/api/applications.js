import { apiGet } from "@/lib/api/client";

export async function getApplications(params) {
  return apiGet("/applications/", params, { next: { tags: ["applications"] } });
}

export async function getApplication(id) {
  return apiGet(`/applications/${id}/`, {}, {
    next: { tags: [`application-${id}`, "applications"] },
  });
}

export async function getApplicationNeighbors(id, params = {}) {
  return apiGet(`/applications/${id}/neighbors/`, params, {
    next: { tags: ["applications"] },
  });
}
