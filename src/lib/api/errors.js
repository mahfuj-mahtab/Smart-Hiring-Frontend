export class ApiError extends Error {
  constructor(body, status = 400) {
    super(body?.message || "Request failed");
    this.name = "ApiError";
    this.success = false;
    this.status = status;
    this.message = body?.message || "Request failed";
    this.errors = body?.errors || null;
    this.data = body?.data || null;
  }

  getFieldErrors() {
    if (!this.errors) return {};
    if (typeof this.errors === "object" && !Array.isArray(this.errors)) {
      return this.errors;
    }
    return { detail: this.errors };
  }
}
