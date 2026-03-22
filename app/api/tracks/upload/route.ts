import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { audioUrl, releaseId } = body;

    if (!audioUrl || !releaseId) {
      return NextResponse.json(
        { error: "Нет audioUrl или releaseId" },
        { status: 400 }
      );
    }

    const release = await prisma.release.findUnique({
      where: { id: releaseId },
      include: {
        artist: true,
      },
    });

    if (!release) {
      return NextResponse.json(
        { error: "Release не найден" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: release.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User не найден" },
        { status: 404 }
      );
    }

    const file = await prisma.file.create({
      data: {
        type: "AUDIO",
        url: audioUrl,
        size: 0,
        mimeType: "audio/mpeg",
        uploadedBy: user.id,
      },
    });

    const track = await prisma.track.create({
      data: {
        title: "Новый трек",
        releaseId,
        audioFileId: file.id,

        artists: {
          create: [
            {
              name: release.artist.name,
            },
          ],
        },
      },
      include: {
        audioFile: true,
        artists: true,
      },
    });

    return NextResponse.json(track);

  } catch (error) {
    console.error("UPLOAD TRACK ERROR:", error);

    return NextResponse.json(
      { error: "Ошибка создания трека" },
      { status: 500 }
    );
  }
}