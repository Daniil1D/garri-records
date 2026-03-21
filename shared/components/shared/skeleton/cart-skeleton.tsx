import { Skeleton } from "@/shared/components/ui/skeleton"
import { Container } from "@/shared/components/shared"

export const CartSkeleton = () => {
  return (
    <Container className="my-6 sm:my-10 px-4 sm:px-6">
      <div className="border rounded-2xl bg-white p-4 sm:p-6 space-y-4">
        <Skeleton className="h-5 sm:h-6 w-24" />

        {[1, 2].map(i => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
              <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
            </div>
            <Skeleton className="h-3 sm:h-4 w-12 sm:w-16" />
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-3">
          <Skeleton className="h-4 sm:h-5 w-24 sm:w-32" />
          <Skeleton className="h-9 sm:h-10 w-full sm:w-32" />
        </div>
      </div>
    </Container>
  )
}