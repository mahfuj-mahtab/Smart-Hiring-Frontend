import { Check } from "lucide-react";
import {
  APPLICATION_STAGES,
  STAGE_LABELS,
  STAGE_ICONS,
  STAGE_THEME,
} from "@/features/applications/constants/stages";
import { cn } from "@/lib/utils";

const PROGRESS_STAGES = APPLICATION_STAGES.filter((stage) => stage !== "rejected");

export function ApplicationStageProgress({ currentStage }) {
  const isRejected = currentStage === "rejected";
  const currentIndex = PROGRESS_STAGES.indexOf(currentStage);

  return (
    <div className="premium-card border-0 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-tight">Hiring progress</p>
          <p className="text-xs text-muted-foreground">
            {isRejected
              ? "This application was marked as rejected"
              : "Track where this candidate is in your pipeline"}
          </p>
        </div>
        {isRejected && (
          <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
            Rejected
          </span>
        )}
      </div>

      <div className="pipeline-stepper">
        {PROGRESS_STAGES.map((stage, index) => {
          const Icon = STAGE_ICONS[stage];
          const theme = STAGE_THEME[stage];
          const isComplete = !isRejected && currentIndex > index;
          const isCurrent = !isRejected && currentStage === stage;
          const isUpcoming = !isRejected && currentIndex < index;

          return (
            <div key={stage} className="pipeline-step">
              <div className="flex flex-col items-center gap-2 min-w-[4.5rem]">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                    isComplete &&
                      "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/25",
                    isCurrent && cn("border-transparent shadow-md", theme.badge, theme.ring, "ring-4"),
                    isUpcoming && "border-border/80 bg-muted/30 text-muted-foreground",
                    isRejected && "border-border/80 bg-muted/20 text-muted-foreground opacity-50"
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span
                  className={cn(
                    "text-center text-[11px] font-medium leading-tight sm:text-xs max-w-[5rem]",
                    isCurrent && theme.header,
                    (isComplete || isCurrent) && "text-foreground font-semibold",
                    (isUpcoming || isRejected) && "text-muted-foreground"
                  )}
                >
                  {STAGE_LABELS[stage]}
                </span>
              </div>
              {index < PROGRESS_STAGES.length - 1 && (
                <div
                  className={cn(
                    "pipeline-step-line",
                    isComplete && "pipeline-step-line--complete",
                    isCurrent && "pipeline-step-line--current"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
