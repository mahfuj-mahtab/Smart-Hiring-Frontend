import { apiGet } from "@/lib/api/client";

export async function getRoles(params) {
  return apiGet("/roles/", params, { next: { tags: ["roles"] } });
}

export async function getRole(id) {
  return apiGet(`/roles/${id}/`, null, { next: { tags: [`role-${id}`] } });
}

export async function getPermissions() {
  return apiGet("/permissions/", null, { next: { tags: ["permissions"] } });
}
