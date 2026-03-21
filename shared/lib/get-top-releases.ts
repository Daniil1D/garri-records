import { prisma } from "@/prisma/prisma-client"
import { autoPublishReleases } from "./release-auto-publish"

export async function getTopReleases(genre?: string) {
  await autoPublishReleases()

  const releases = await prisma.release.findMany({
    where: {
      status: "DISTRIBUTED",

      ...(genre && { genre }),
    },
    include: {
      cover: true,
      artist: true,
        tracks: {
          take: 1,
          include: {
            audioFile: true,
          },
        },
    },
    orderBy: {
      playsCount: "desc",
    },
  })

  await Promise.all(
    releases.map((release, index) =>
      prisma.release.update({
        where: { id: release.id },
        data: { chartPosition: index + 1 },
      })
    )
  )

  const releasesWithAudio = releases.map(release => ({
    ...release,
    tracks: release.tracks.map(track => ({
      id: track.id,
      title: track.title,
      audioUrl: track.audioFile?.url ?? null,
      duration: track.duration ?? null,
      status: track.status,
    })),
  }))

  return releasesWithAudio
}

