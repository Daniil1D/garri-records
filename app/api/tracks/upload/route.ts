import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { audioUrl, releaseId } = body;

  if (!audioUrl || !releaseId) {
    return NextResponse.json(
      { error: "Нет audioUrl или releaseId" },
      { status: 400 }
    );
  }

  // 🔥 ДОБАВЛЕНО: создаём файл
  const file = await prisma.file.create({
    data: {
      type: "AUDIO",
      url: audioUrl,
      size: 0, // ⚠️ можно потом прокинуть реальный размер
      mimeType: "audio/mpeg", // ⚠️ можно улучшить
      uploadedBy: "system", // ⚠️ позже заменим на userId
    },
  });

  const track = await prisma.track.create({
    data: {
      title: "Новый трек",
      releaseId,
      audioFileId: file.id,
    },
    include: {
      audioFile: true,
    },
  });

  return NextResponse.json(track);
}