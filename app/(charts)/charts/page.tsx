import { Suspense } from "react";
import { Container } from "@/shared/components/shared";
import { ChartsListServer } from "./_components/charts-list-server";
import { ReleasesSkeleton } from "@/shared/components/shared/skeleton/releases-skeleton";

export default function ChartsPage() {
  return (
    <Container className="space-y-6 sm:space-y-8 lg:space-y-10 mt-6 sm:mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold">Топ чарты</h1>

      <Suspense fallback={<ReleasesSkeleton />}>
        <ChartsListServer />
      </Suspense>
    </Container>
  );
}