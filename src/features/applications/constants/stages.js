import {
  Inbox,
  Search,
  MessageSquare,
  Gift,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const APPLICATION_STAGES = [
  "applied",
  "screening",
  "interview",
  "offer",
  "hired",
  "rejected",
];

export const STAGE_LABELS = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
  hired: "Hired",
  rejected: "Rejected",
};

export const STAGE_ICONS = {
  applied: Inbox,
  screening: Search,
  interview: MessageSquare,
  offer: Gift,
  hired: CheckCircle2,
  rejected: XCircle,
};

export const STAGE_THEME = {
  applied: {
    dot: "bg-sky-500",
    ring: "ring-sky-500/20",
    header: "text-sky-700 dark:text-sky-300",
    column: "border-sky-500/15 bg-sky-500/[0.04]",
    columnActive: "border-sky-500/30 bg-sky-500/[0.08]",
    accent: "border-l-sky-500",
    badge: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    count: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  },
  screening: {
    dot: "bg-amber-500",
    ring: "ring-amber-500/20",
    header: "text-amber-700 dark:text-amber-300",
    column: "border-amber-500/15 bg-amber-500/[0.04]",
    columnActive: "border-amber-500/30 bg-amber-500/[0.08]",
    accent: "border-l-amber-500",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    count: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  },
  interview: {
    dot: "bg-violet-500",
    ring: "ring-violet-500/20",
    header: "text-violet-700 dark:text-violet-300",
    column: "border-violet-500/15 bg-violet-500/[0.04]",
    columnActive: "border-violet-500/30 bg-violet-500/[0.08]",
    accent: "border-l-violet-500",
    badge: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
    count: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  },
  offer: {
    dot: "bg-orange-500",
    ring: "ring-orange-500/20",
    header: "text-orange-700 dark:text-orange-300",
    column: "border-orange-500/15 bg-orange-500/[0.04]",
    columnActive: "border-orange-500/30 bg-orange-500/[0.08]",
    accent: "border-l-orange-500",
    badge: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    count: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  },
  hired: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    header: "text-emerald-700 dark:text-emerald-300",
    column: "border-emerald-500/15 bg-emerald-500/[0.04]",
    columnActive: "border-emerald-500/30 bg-emerald-500/[0.08]",
    accent: "border-l-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    count: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  rejected: {
    dot: "bg-rose-500",
    ring: "ring-rose-500/20",
    header: "text-rose-700 dark:text-rose-300",
    column: "border-rose-500/15 bg-rose-500/[0.04]",
    columnActive: "border-rose-500/30 bg-rose-500/[0.08]",
    accent: "border-l-rose-500",
    badge: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    count: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  },
};

/** @deprecated use STAGE_THEME.badge */
export const STAGE_COLORS = Object.fromEntries(
  APPLICATION_STAGES.map((stage) => [stage, STAGE_THEME[stage].badge])
);
