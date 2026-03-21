import { Skeleton } from "@/shared/components/ui/skeleton";

export const ReleasesSkeleton = () => {
  return (
    <div className="space-y-3 sm:space-y-4 px-4 sm:px-0">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-2xl p-4 bg-white"
        >
          <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl" />

          <div className="flex-1 space-y-2 w-full">
            <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
            <Skeleton className="h-5 sm:h-6 w-32 sm:w-48" />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Skeleton className="h-9 sm:h-10 w-full sm:w-32 rounded-xl" />
            <Skeleton className="h-9 sm:h-10 w-full sm:w-32 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};