import { getRefreshToken, setAuthCookies, clearAuthCookies } from "@/lib/auth/cookies";

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function refreshAccessToken() {
  const refresh = await getRefreshToken();
  if (!refresh) return false;

  try {
    const res = await fetch(`${API_URL}/api/v1/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
      cache: "no-store",
    });

    const body = await res.json();
    if (!body.success) {
      await clearAuthCookies();
      return false;
    }

    const tokens = body.data?.tokens || body.data;
    if (!tokens?.access) return false;

    await setAuthCookies({
      access: tokens.access,
      refresh: tokens.refresh || refresh,
    });
    return true;
  } catch {
    await clearAuthCookies();
    return false;
  }
}
