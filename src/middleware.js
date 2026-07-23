import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/register/candidate",
  "/careers",
];

const EMPLOYER_PATHS = ["/dashboard", "/roles", "/members", "/jobs", "/applications"];
const CANDIDATE_PATHS = ["/candidate"];

const RESERVED_SUBDOMAINS = ["www", "api", "admin"];

function getOrgSlugFromHost(hostname) {
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost";
  const host = hostname.split(":")[0].toLowerCase();

  if (host === baseDomain || host === "127.0.0.1") {
    return null;
  }

  if (host.endsWith(`.${baseDomain}`)) {
    const slug = host.replace(`.${baseDomain}`, "");
    if (slug && !RESERVED_SUBDOMAINS.includes(slug)) {
      return slug;
    }
  }

  return null;
}

function isPublicPath(pathname) {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

function isEmployerPath(pathname) {
  return EMPLOYER_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

function isCandidatePath(pathname) {
  return CANDIDATE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const accountType = request.cookies.get("account_type")?.value;
  const orgSlugCookie = request.cookies.get("org_slug")?.value;

  const hostSlug = getOrgSlugFromHost(request.headers.get("host") || "");
  const orgSlug = hostSlug || orgSlugCookie;

  const requestHeaders = new Headers(request.headers);
  if (orgSlug) {
    requestHeaders.set("x-org-slug", orgSlug);
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (orgSlug && orgSlug !== orgSlugCookie) {
    response.cookies.set("org_slug", orgSlug, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  if (isPublicPath(pathname)) {
    if (accessToken && accountType === "employer" && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (accessToken && accountType === "candidate" && pathname === "/login") {
      return NextResponse.redirect(new URL("/candidate/profile", request.url));
    }
    return response;
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isEmployerPath(pathname)) {
    if (accountType === "candidate") {
      return NextResponse.redirect(new URL("/candidate/profile", request.url));
    }
    if (!orgSlug) {
      return NextResponse.redirect(
        new URL("/login?error=org_required", request.url)
      );
    }
  }

  if (isCandidatePath(pathname) && accountType === "employer") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
