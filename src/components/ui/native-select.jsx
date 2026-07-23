import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function NativeSelect({ className, wrapperClassName, ...props }) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <select
        className={cn(
          "flex h-10 w-full appearance-none rounded-lg border border-input/80 bg-card/80 px-3 py-2 pr-9 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
