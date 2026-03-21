import { Skeleton } from "@/shared/components/ui/skeleton"
import { Container } from "@/shared/components/shared"

export const PlansSkeleton = () => {
  return (
    <Container className="my-6 sm:my-10 px-4 sm:px-6">
      <Skeleton className="h-5 sm:h-6 w-32 sm:w-40 mb-6 sm:mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2].map(i => (
          <div
            key={i}
            className="border rounded-xl p-4 sm:p-6 space-y-4 bg-white"
          >
            <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
            <Skeleton className="h-3 sm:h-4 w-full" />
            <Skeleton className="h-9 sm:h-10 w-full" />
          </div>
        ))}
      </div>
    </Container>
  )
}