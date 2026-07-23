import { ROUTES } from "@/constants/routes";

const REVIEW_CONTEXT_KEYS = ["stage", "job", "search", "ordering", "view"];

export function buildReviewQuery(searchParams = {}) {
  const params = new URLSearchParams();
  REVIEW_CONTEXT_KEYS.forEach((key) => {
    const value = searchParams[key];
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function applicationReviewUrl(id, searchParams = {}) {
  return `${ROUTES.applicationDetail(id)}${buildReviewQuery(searchParams)}`;
}

export function applicationsListUrl(searchParams = {}) {
  return `${ROUTES.APPLICATIONS}${buildReviewQuery(searchParams)}`;
}
