"use client";

import { usePlayer } from "@/shared/store/global-player"

interface Props {
  index: number;
  title: string;
  artist: string;
  coverUrl?: string | null;
  tracksCount: number;
  firstTrack?: {
    audioUrl?: string | null
    audioFile?: {
      url: string
    }
  }
  releaseId: string
}

export const ChartReleaseCard: React.FC<Props> = ({
  index,
  title,
  artist,
  coverUrl,
  tracksCount,
  firstTrack,
  releaseId,
}) => {
  const { play } = usePlayer()

  return (
    <div className="flex items-center gap-3 sm:gap-5 border rounded-2xl p-3 sm:p-4 bg-white hover:shadow transition">

      <div className="text-lg sm:text-2xl font-bold w-8 sm:w-10 text-gray-400">
        {index}
      </div>

      <div
        onClick={() =>
          play({
            audioUrl: firstTrack?.audioUrl ?? undefined,
            title,
            artist,
            cover: coverUrl ?? undefined,
            releaseId,
          })
        }
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-100 overflow-hidden cursor-pointer hover:scale-105 transition"
      >
        {coverUrl ? (
          <img src={coverUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">🎵</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate">{title}</div>
        <div className="text-xs sm:text-sm text-gray-500 truncate">{artist}</div>
      </div>

      <div className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
        {tracksCount} треков
      </div>
    </div>
  );
};