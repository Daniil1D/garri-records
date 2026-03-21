// 📁 shared/components/.../ReleaseDetailsServer.tsx

import { prisma } from "@/prisma/prisma-client";
import { Container, Title } from "@/shared/components/shared";

interface Props {
  releaseId: string;
}

export async function ReleaseDetailsServer({ releaseId }: Props) {
  const release = await prisma.release.findUnique({
    where: { id: releaseId },
    include: {
      artist: true,
      label: true,
      tracks: {
        orderBy: { createdAt: "asc" },
        include: {
          artists: true,
        },
      },
      platforms: {
        include: { platform: true },
      },
      cover: true,
    },
  });

  if (!release) {
    return <Container>Релиз не найден</Container>;
  }

  const statusMap: Record<string, string> = {
    DRAFT: "Черновик",
    SUBMITTED: "Отправлен",
    IN_REVIEW: "На проверке",
    APPROVED: "Одобрен",
    DISTRIBUTED: "Доставлен",
    REJECTED: "Отклонён",
  };

  const coverUrl = release.cover?.url ?? null;

  return (
    <div className="space-y-8 sm:space-y-10">
      
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">

        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={release.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              🎵
            </div>
          )}
        </div>

        <div className="min-w-0">
          <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 mb-1">
            {statusMap[release.status]}
          </span>

          <h1 className="text-xl sm:text-2xl font-bold break-words">
            {release.title}
          </h1>

          <p className="text-sm text-gray-500 break-words">
            {release.artist.name}
            {release.label ? ` • ${release.label.name}` : ""}
          </p>
        </div>
      </div>

      <div>
        <Title text="Треки" size="xl" />

        <ul className="space-y-2">
          {release.tracks.map((track) => (
            <li
              key={track.id}
              className="
                flex 
                flex-col sm:flex-row  
                gap-2 sm:gap-0
                justify-between 
                items-start sm:items-center
                p-3 border rounded-xl
              "
            >
              <span className="break-words">
                {track.artists.map((a) => a.name).join(", ")} — {track.title}
              </span>

              <span className="text-gray-400 text-sm shrink-0">
                {track.duration}s
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Title text="Площадки" size="xl" />

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {release.platforms.map((rp) => (
            <span
              key={rp.platformId}
              className="flex items-center gap-2 border rounded-xl px-2 sm:px-3 py-1 bg-white text-xs sm:text-sm">
              {rp.platform.logo && (
                <img
                  src={rp.platform.logo}
                  alt={rp.platform.name}
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
              )}
              {rp.platform.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}