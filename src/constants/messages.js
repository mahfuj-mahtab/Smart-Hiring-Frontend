export const MESSAGES = {
  auth: {
    loginSuccess: "Login successful",
    loginFailed: "Invalid username or password",
    registerSuccess: "Registration successful",
    logoutSuccess: "Logged out successfully",
    sessionExpired: "Your session has expired. Please log in again.",
  },
  roles: {
    created: "Role created successfully",
    updated: "Role updated successfully",
    deleted: "Role deleted successfully",
    deleteConfirm: "Are you sure you want to delete this role?",
    systemRoleReadOnly: "System roles cannot be modified",
  },
  members: {
    created: "Member added successfully",
    updated: "Member updated successfully",
    deactivated: "Member deactivated successfully",
    deleteConfirm: "Are you sure you want to deactivate this member?",
    limitReached:
      "You have reached your plan member limit. Upgrade your plan to add more members.",
  },
  common: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    search: "Search...",
    noResults: "No results found",
    loading: "Loading...",
    error: "Something went wrong",
    retry: "Try again",
  },
  jobs: {
    created: "Job created successfully",
    updated: "Job updated successfully",
    deleted: "Job deleted successfully",
    published: "Job published successfully",
    closed: "Job closed successfully",
    deleteConfirm: "Are you sure you want to delete this job?",
    limitReached:
      "You have reached your plan job limit. Upgrade your plan to post more jobs.",
  },
  applications: {
    stageUpdated: "Application stage updated",
    applied: "Application submitted successfully",
  },
};
