import { Container, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { ReleaseMainForm } from "@/shared/components/shared/platforms/release-main-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditReleasePage({ params }: PageProps) {
  const { id } = await params;

  const release = await prisma.release.findUnique({
    where: { id },
    include: {
      artist: true,
      platforms: {
        include: {
          platform: true,
        },
      },
    },
  });

  if (!release) return <div>Релиз не найден</div>;

  const allPlatforms = await prisma.platform.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <Container
      className="space-y-6 sm:space-y-8 md:space-y-10 mt-4 sm:mt-6 md:mt-10 px-4 sm:px-6 md:px-0"
    >
      <Title
        text="Редактирование площадок"
        size="2xl"
        className="text-xl sm:text-2xl md:text-3xl"
      />

      <ReleaseMainForm
        release={release}
        platforms={allPlatforms}
        id={release.id}
      />
    </Container>
  );
}