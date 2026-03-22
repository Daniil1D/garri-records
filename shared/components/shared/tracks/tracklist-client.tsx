"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { TrackForm } from "./track-form";
import { TracklistActions } from "./tracklist-actions";
import { useUploadThing } from "@/shared/lib/uploadthing";
import axios from "axios";

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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [completedTracks, setCompletedTracks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { startUpload } = useUploadThing("audioUploader", {
    onClientUploadComplete: async (uploadRes) => {
      try {
        const url = uploadRes?.[0]?.serverData?.url;

        if (!url) throw new Error("Нет URL");

        await axios.post("/api/tracks/upload", {
          audioUrl: url,
          releaseId: tracks[0]?.releaseId,
        });

        toast.success("Трек добавлен 🎵");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Ошибка сохранения ❌");
      }
    },
    onUploadError: (error: Error) => {
      toast.error(`Ошибка загрузки: ${error.message}`);
    },
  });

  const onAddTrack = () => {
    inputRef.current?.click();
  };

  const onFileSelect = async (fileList: FileList | null) => {
    if (!fileList?.length) return;

    const file = fileList[0];

    try {
      setLoading(true);
      await startUpload([file]);
    } catch (err) {
      toast.error("Ошибка загрузки трека");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackCompleted = (trackId: string) => {
    setCompletedTracks((prev) => [...prev, trackId]);
  };

  const allTracksReady =
    completedTracks.length === tracks.length && tracks.length > 0;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {tracks.map((track) => (
          <TrackForm
            key={track.id}
            track={track}
            onCompleted={() => handleTrackCompleted(track.id)}
          />
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".wav,.mp3"
        hidden
        onChange={(e) => onFileSelect(e.target.files)}
      />

      <div className="mt-6 sm:mt-8">
        <TracklistActions
          onAddTrack={onAddTrack}
          allTracksReady={allTracksReady}
        />
      </div>
    </>
  );
};