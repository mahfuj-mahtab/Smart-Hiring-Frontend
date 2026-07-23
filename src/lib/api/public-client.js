import { ApiError } from "./errors";
import { getOrgHeaders } from "./org-headers";

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function publicApiGet(path) {
  const headers = await getOrgHeaders();
  const res = await fetch(`${API_URL}/api/v1${path}`, {
    headers: { "Content-Type": "application/json", ...headers },
    cache: "no-store",
  });

  let body;
  try {
    body = await res.json();
  } catch {
    throw new ApiError({ message: "Invalid response from server" }, res.status);
  }

  if (!body.success) {
    throw new ApiError(body, res.status);
  }

  return body;
}
