export const JOB_STATUS = {
  DRAFT: "draft",
  OPEN: "open",
  CLOSED: "closed",
};

export const JOB_STATUS_LABELS = {
  draft: "Draft",
  open: "Open",
  closed: "Closed",
};

export const EMPLOYMENT_TYPES = {
  FULL_TIME: "full_time",
  PART_TIME: "part_time",
  CONTRACT: "contract",
  INTERNSHIP: "internship",
  TEMPORARY: "temporary",
};

export const EMPLOYMENT_TYPE_LABELS = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
  temporary: "Temporary",
};

export const WORK_MODES = {
  ONSITE: "onsite",
  HYBRID: "hybrid",
  REMOTE: "remote",
};

export const WORK_MODE_LABELS = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

export const EXPERIENCE_LEVELS = {
  ENTRY: "entry",
  JUNIOR: "junior",
  MID: "mid",
  SENIOR: "senior",
  LEAD: "lead",
  EXECUTIVE: "executive",
};

export const EXPERIENCE_LEVEL_LABELS = {
  entry: "Entry Level",
  junior: "Junior",
  mid: "Mid Level",
  senior: "Senior",
  lead: "Lead",
  executive: "Executive",
};

export const CURRENCIES = ["USD", "EUR", "GBP", "BDT", "INR"];

export function formatSalary(min, max, currency = "USD") {
  if (!min && !max) return null;
  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max)}`;
}
