import { Skeleton } from "@/components/ui/skeleton";

export function TablePageSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-6 page-enter">
      <div className="space-y-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>
      <Skeleton className="h-10 w-full max-w-md" />
      <div className="table-container overflow-hidden">
        <div className="border-b border-border/60 bg-muted/30 px-4 py-3">
          <div className="flex gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>
        <div className="divide-y divide-border/40">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4 py-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
