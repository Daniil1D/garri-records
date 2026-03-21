import { Container, Title } from "@/shared/components/shared";
import { ReleaseInformationForm } from "@/shared/components/shared/releaseInformationForm/release-information-form";

import { prisma } from "@/prisma/prisma-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InformationReleasePage({ params }: PageProps) {
  const { id: releaseId } = await params;

  const release = await prisma.release.findUnique({
    where: { id: releaseId },
    include: {
      tracks: {
        include: {
          artists: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return (
    <Container
      className="mt-4 sm:mt-6 md:mt-10 space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-0"
    >
      <Title
        text="Информация о релизе"
        size="xl"
        className="text-lg sm:text-xl md:text-2xl"
      />

      <ReleaseInformationForm
        releaseId={releaseId}
        release={release}
      />
    </Container>
  );
}