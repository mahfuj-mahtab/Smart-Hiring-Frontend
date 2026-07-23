import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default:
      "border-transparent bg-primary/90 text-primary-foreground shadow-sm shadow-primary/10",
    secondary:
      "border-transparent bg-secondary text-secondary-foreground",
    outline:
      "border-border/80 bg-background/50 text-foreground",
    destructive:
      "border-transparent bg-destructive/90 text-destructive-foreground",
    success:
      "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    warning:
      "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
