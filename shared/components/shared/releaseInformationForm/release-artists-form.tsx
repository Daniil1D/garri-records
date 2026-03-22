"use client";

import { FormInput } from "@/shared/components/shared/form/form-input";
import { ReleaseWithTracks } from "@/shared/types/release-with-tracks";

interface Props {
  release: ReleaseWithTracks;
}

export const ReleaseArtistsForm = ({ release }: Props) => {
  const firstTrack = release.tracks?.[0];
  const firstArtist = firstTrack?.artists?.[0]
  return (
    <div className="rounded-3xl border bg-white shadow-sm p-4 sm:p-6 md:p-8  space-y-4">
      <div className="space-y-1">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">Исполнители</h2>
        <p className="text-sm text-gray-500">
          Артисты, которые будут указаны в оглавлении релиза и в треклисте.
        </p>
      </div>

      <FormInput
        name="artist"
        defaultValue={firstArtist?.name ?? ""} 
        placeholder="Название артиста"
        disabled
      />
    </div>
  );
};
