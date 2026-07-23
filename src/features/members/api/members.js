import { apiGet } from "@/lib/api/client";

export async function getMembers(params) {
  return apiGet("/members/", params, { next: { tags: ["members"] } });
}

export async function getMember(id) {
  return apiGet(`/members/${id}/`, null, { next: { tags: [`member-${id}`] } });
}
