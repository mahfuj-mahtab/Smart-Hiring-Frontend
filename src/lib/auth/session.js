import { apiGet } from "@/lib/api/client";
import { getAccessToken, getAccountType } from "@/lib/auth/cookies";

export async function getServerSession() {
  const token = await getAccessToken();
  if (!token) return null;

  const accountType = await getAccountType();
  if (!accountType) return { authenticated: true, accountType: null };

  try {
    if (accountType === "candidate") {
      const { data } = await apiGet("/candidate/me/");
      return { authenticated: true, accountType: "candidate", user: data };
    }

    const { data } = await apiGet("/me/");
    return {
      authenticated: true,
      accountType: "employer",
      user: data,
      permissions: data.permissions || [],
      isOwner: data.is_owner || false,
      organization: data.organization,
    };
  } catch {
    return { authenticated: true, accountType, user: null };
  }
}
