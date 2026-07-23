import { cn } from "@/lib/utils";
import { STAGE_LABELS, STAGE_THEME } from "@/features/applications/constants/stages";

export function StageBadge({ stage, className, showDot = true }) {
  const theme = STAGE_THEME[stage];
  if (!theme) {
    return (
      <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", className)}>
        {STAGE_LABELS[stage] || stage}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        theme.badge,
        className
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", theme.dot)} />}
      {STAGE_LABELS[stage] || stage}
    </span>
  );
}
