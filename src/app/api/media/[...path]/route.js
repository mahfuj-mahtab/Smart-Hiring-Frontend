import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth/cookies";
import { toAbsoluteMediaUrl } from "@/lib/media-url";

export async function GET(_request, { params }) {
  const { path } = await params;
  const segments = Array.isArray(path) ? path.join("/") : path;
  const upstream = toAbsoluteMediaUrl(`/media/${segments}`);
  const token = await getAccessToken();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(upstream, { headers, cache: "no-store" });
  if (!res.ok) {
    return NextResponse.json({ message: "File not found" }, { status: res.status });
  }

  const responseHeaders = new Headers();
  const contentType = res.headers.get("Content-Type");
  if (contentType) responseHeaders.set("Content-Type", contentType);
  const contentDisposition = res.headers.get("Content-Disposition");
  if (contentDisposition) responseHeaders.set("Content-Disposition", contentDisposition);
  responseHeaders.set("Cache-Control", "private, max-age=3600");

  return new NextResponse(res.body, {
    status: 200,
    headers: responseHeaders,
  });
}
