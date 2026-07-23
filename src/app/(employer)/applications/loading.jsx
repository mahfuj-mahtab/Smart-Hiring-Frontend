import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationsLoading() {
  return (
    <div className="space-y-6 page-enter">
      <div className="space-y-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
      <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-28 rounded-full" />
        ))}
      </div>
      <div className="flex gap-4 overflow-hidden pb-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-80 shrink-0 rounded-xl border border-border/60 p-3"
          >
            <div className="mb-4 flex items-center justify-between px-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-6 w-8 rounded-full" />
            </div>
            <div className="space-y-3 rounded-xl bg-muted/30 p-3">
              {[...Array(2)].map((_, j) => (
                <Skeleton key={j} className="h-36 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
