import { cookies } from "next/headers";

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  ORG_SLUG: "org_slug",
  ACCOUNT_TYPE: "account_type",
};

const ACCESS_MAX_AGE = 60 * 60;
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7;

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || null;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value || null;
}

export async function getOrgSlug() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.ORG_SLUG)?.value || null;
}

export async function getAccountType() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.ACCOUNT_TYPE)?.value || null;
}

export async function setAuthCookies({ access, refresh, accountType, orgSlug }) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });

  cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_MAX_AGE,
  });

  if (accountType) {
    cookieStore.set(COOKIE_NAMES.ACCOUNT_TYPE, accountType, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_MAX_AGE,
    });
  }

  if (orgSlug) {
    cookieStore.set(COOKIE_NAMES.ORG_SLUG, orgSlug, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_MAX_AGE,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  Object.values(COOKIE_NAMES).forEach((name) => {
    cookieStore.delete(name);
  });
}
