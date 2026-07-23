import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationReviewLoading() {
  return (
    <div className="space-y-6 page-enter">
      <Skeleton className="h-10 w-48" />
      <div className="premium-card border-0 p-8 space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-[28rem] rounded-xl" />
      </div>
    </div>
  );
}
