import { ApiError } from "./errors";
import { getAuthHeaders } from "./auth-headers";
import { refreshAccessToken } from "@/lib/auth/refresh";

const API_URL = process.env.API_URL || "http://localhost:8000";

export function toQuery(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function parseApiResponse(res) {
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

export async function apiFetch(path, options = {}) {
  const { retryOnUnauthorized = true, ...fetchOptions } = options;

  const makeRequest = async () => {
    const headers = {
      "Content-Type": "application/json",
      ...(await getAuthHeaders()),
      ...fetchOptions.headers,
    };

    return fetch(`${API_URL}/api/v1${path}`, {
      ...fetchOptions,
      headers,
      cache: fetchOptions.cache ?? "no-store",
    });
  };

  let res = await makeRequest();

  if (res.status === 401 && retryOnUnauthorized && !path.startsWith("/auth/")) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await makeRequest();
    }
  }

  return parseApiResponse(res);
}

export async function apiGet(path, params = {}, options = {}) {
  return apiFetch(`${path}${toQuery(params)}`, { ...options, method: "GET" });
}

export async function apiPost(path, data, options = {}) {
  return apiFetch(path, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiPatch(path, data, options = {}) {
  return apiFetch(path, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function apiDelete(path, options = {}) {
  return apiFetch(path, { ...options, method: "DELETE" });
}

export async function apiPostForm(path, formData, options = {}) {
  const { retryOnUnauthorized = true, ...fetchOptions } = options;

  const makeRequest = async () => {
    const authHeaders = await getAuthHeaders();
    const headers = { ...authHeaders, ...fetchOptions.headers };

    return fetch(`${API_URL}/api/v1${path}`, {
      ...fetchOptions,
      method: "POST",
      headers,
      body: formData,
      cache: fetchOptions.cache ?? "no-store",
    });
  };

  let res = await makeRequest();

  if (res.status === 401 && retryOnUnauthorized && !path.startsWith("/auth/")) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await makeRequest();
    }
  }

  return parseApiResponse(res);
}

export async function apiPatchForm(path, formData, options = {}) {
  const { retryOnUnauthorized = true, ...fetchOptions } = options;

  const makeRequest = async () => {
    const authHeaders = await getAuthHeaders();
    const headers = { ...authHeaders, ...fetchOptions.headers };

    return fetch(`${API_URL}/api/v1${path}`, {
      ...fetchOptions,
      method: "PATCH",
      headers,
      body: formData,
      cache: fetchOptions.cache ?? "no-store",
    });
  };

  let res = await makeRequest();

  if (res.status === 401 && retryOnUnauthorized && !path.startsWith("/auth/")) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await makeRequest();
    }
  }

  return parseApiResponse(res);
}
