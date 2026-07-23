import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ErrorAlert({ message, className }) {
  if (!message) return null;
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3.5 text-sm text-destructive shadow-sm",
        className
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
        <AlertCircle className="h-4 w-4" />
      </div>
      <span className="leading-relaxed">{message}</span>
    </div>
  );
}
