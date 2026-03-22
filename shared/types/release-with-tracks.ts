import { Prisma } from "@prisma/client";

export type ReleaseWithTracks = Prisma.ReleaseGetPayload<{
  include: {
    artist: true;
    label: true;
    cover: true;
    tracks: {
      include: {
        artists: true;
      };
    };
  };
}>;