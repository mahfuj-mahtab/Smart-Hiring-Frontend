import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationReviewLoading() {
  return (
    <div className="space-y-6 page-enter">
      <Skeleton className="h-14 w-full rounded-xl" />
      <div className="stat-card p-8 space-y-4">
        <div className="flex gap-5">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-2">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
        <Skeleton className="h-[28rem] rounded-xl xl:col-span-3" />
      </div>
    </div>
  );
}
