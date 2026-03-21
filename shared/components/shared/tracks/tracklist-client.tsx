"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { TrackForm } from "./track-form";
import { TracklistActions } from "./tracklist-actions";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";
import toast from "react-hot-toast";

type TrackWithRelations = Prisma.TrackGetPayload<{
  include: {
    artists: true;
    feats: true;
    audioFile: true;
  };
}>;

interface TracklistClientProps {
  tracks: TrackWithRelations[];
}

export const TracklistClient = ({ tracks }: TracklistClientProps) => {
  const router = useRouter();
  const [completedTracks, setCompletedTracks] = useState<string[]>([]);

  const handleTrackCompleted = (trackId: string) => {
    setCompletedTracks((prev) => [...prev, trackId]);
  };

  const allTracksReady =
    completedTracks.length === tracks.length && tracks.length > 0;

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {tracks.map((track) => (
          <TrackForm
            key={track.id}
            track={track}
            onCompleted={() => handleTrackCompleted(track.id)}
          />
        ))}
      </div>

      <div className="mt-6 space-y-4">

        <UploadButton<OurFileRouter, "audioUploader">
          endpoint="audioUploader"
          onClientUploadComplete={async (res) => {
            const url = res[0].url;

            await fetch("/api/tracks/upload", {
              method: "POST",
              body: JSON.stringify({
                audioUrl: url,
                releaseId: tracks[0]?.releaseId,
              }),
            });

            toast.success("Трек загружен ✅");
            router.refresh();
          }}
          onUploadError={() => {
            toast.error("Ошибка загрузки ❌");
          }}
        />

        <TracklistActions
          allTracksReady={allTracksReady}
        />
      </div>
    </>
  );
};