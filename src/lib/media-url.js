const API_URL = process.env.API_URL || "http://localhost:8000";

export function extractMediaPath(url) {
  if (!url) return null;
  if (url.startsWith("/media/")) return url.slice("/media/".length);
  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith("/media/")) {
      return parsed.pathname.slice("/media/".length);
    }
  } catch {
    return null;
  }
  return null;
}

export function toProxiedMediaUrl(url) {
  const mediaPath = extractMediaPath(url);
  if (!mediaPath) return url;
  return `/api/media/${mediaPath}`;
}

export function toAbsoluteMediaUrl(url) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/media/")) return `${API_URL}${url}`;
  return url;
}
