"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import { useRouter, useParams } from "next/navigation";

interface TracklistActionsProps {
  onAddTrack?: () => void;
  allTracksReady: boolean;
}

export const TracklistActions: React.FC<TracklistActionsProps> = ({
  onAddTrack,
  allTracksReady,
}) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const releaseId = params.id;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <Button
        className="w-full h-12 sm:h-14 rounded-xl border text-sm sm:text-base md:text-lg"
        onClick={onAddTrack}
      >
        + Ещё один трек
      </Button>

      <Button
        className="w-full h-12 sm:h-14 rounded-xl border text-sm sm:text-base md:text-lg"
        disabled={!allTracksReady}
        onClick={() =>
          router.push(`/releases/${releaseId}/information-releases`)
        }
      >
        Далее
      </Button>

      <Button
        variant="outline"
        className="text-xs sm:text-sm text-gray-500"
        onClick={() => history.back()}
      >
        ← Назад
      </Button>
    </div>
  );
};