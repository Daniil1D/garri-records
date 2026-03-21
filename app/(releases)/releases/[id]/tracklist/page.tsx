import { prisma } from "@/prisma/prisma-client";
import { Container, Title } from "@/shared/components/shared";
import { TracklistClient } from "@/shared/components/shared/tracks/tracklist-client";

interface PageProps {
  params: { id: string };
}

export default async function TracklistPage({ params }: PageProps) {
  const { id: releaseId } = await params; 

  const tracks = await prisma.track.findMany({
    where: { releaseId },
    include: {
      artists: true,
      feats: true,
      audioFile: true,
    },
  });

  return (
    <Container
      className="space-y-6 sm:space-y-8 md:space-y-10 mt-4 sm:mt-6 md:mt-10 px-4 sm:px-6 md:px-0"
    >
      <Title
        text="Треклист"
        size="2xl"
        className="text-xl sm:text-2xl md:text-3xl"
      />

      <TracklistClient tracks={tracks} />
    </Container>
  );
}