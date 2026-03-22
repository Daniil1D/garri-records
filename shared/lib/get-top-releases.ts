import { prisma } from "@/prisma/prisma-client"
import { autoPublishReleases } from "./release-auto-publish"

export async function getTopReleases(genre?: string) {
  await autoPublishReleases()

  const tracks = await prisma.track.findMany({
    where: {
      release: {
        status: "DISTRIBUTED",
        ...(genre && { genre }),
      },
    },
    include: {
      audioFile: true,
      release: {
        include: {
          artist: true,
          cover: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  })

  const result = tracks.map((track, index) => ({
    id: track.id,
    title: track.title,
    artist: track.release.artist,
    cover: track.release.cover,
    tracks: [
      {
        id: track.id,
        title: track.title,
        audioUrl: track.audioFile?.url ?? null,
        duration: track.duration ?? null,
        status: track.status,
      },
    ],
  }))

  return result
}
