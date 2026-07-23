import { apiPost } from "@/lib/api/client";

export async function loginApi(credentials) {
  return apiPost("/auth/login/", credentials, { retryOnUnauthorized: false });
}

export async function registerEmployerApi(data) {
  return apiPost("/auth/register/", data, { retryOnUnauthorized: false });
}

export async function registerCandidateApi(data) {
  return apiPost("/auth/register/candidate/", data, {
    retryOnUnauthorized: false,
  });
}
