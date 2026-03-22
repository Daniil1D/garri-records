// 📁 app/api/tracks/upload/route.ts

import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { audioUrl, releaseId } = body;

    // 🔥 ВАЛИДАЦИЯ
    if (!audioUrl || !releaseId) {
      return NextResponse.json(
        { error: "Нет audioUrl или releaseId" },
        { status: 400 }
      );
    }

    // 🔥 ДОБАВЛЕНО: берём релиз, чтобы взять имя артиста
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

    // 🔥 ВАЖНО: берём реального пользователя
    const user = await prisma.user.findUnique({
      where: { id: release.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User не найден" },
        { status: 404 }
      );
    }

    // 🔥 СОЗДАЁМ FILE (БЕЗ system!)
    const file = await prisma.file.create({
      data: {
        type: "AUDIO",
        url: audioUrl,
        size: 0,
        mimeType: "audio/mpeg",
        uploadedBy: user.id, // ✅ ИСПРАВЛЕНО
      },
    });

    // 🔥 СОЗДАЁМ TRACK + TrackArtist
    const track = await prisma.track.create({
      data: {
        title: "Новый трек",
        releaseId,
        audioFileId: file.id,

        // ✅ ВАЖНО: создаём TrackArtist
        artists: {
          create: [
            {
              name: release.artist.name, // 🔥 БЕРЁМ ИЗ РЕЛИЗА
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