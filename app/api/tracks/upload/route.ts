import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { audioUrl, releaseId } = body;

  const track = await prisma.track.create({
    data: {
      title: "Новый трек",
      audioUrl,
      releaseId,
    },
  });

  return NextResponse.json(track);
}