"use client";

import { useRef, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// 🔥 ДОБАВЛЕНО
import { useUploadThing } from "@/shared/lib/uploadthing";

const MAX_SIZE_MB = 20;

export const UploadAudioClient = ({ releaseId }: { releaseId: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("audioUploader", {
    onClientUploadComplete: async (uploadRes) => {
      try {
        const url = uploadRes?.[0]?.serverData?.url;

        if (!url) throw new Error("Нет URL");

       const response = await fetch("/api/tracks/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 🔥 ДОБАВЛЕНО
        },
        body: JSON.stringify({
          audioUrl: url,
          releaseId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || "Ошибка создания трека");
      }

        toast.success("Трек загружен 🎵");
        router.push(`/releases/${releaseId}/tracklist`);
      } catch (err) {
        console.error(err);
        toast.error("Ошибка сохранения ❌");
      }
    },
    onUploadError: (error: Error) => {
      toast.error(`Ошибка загрузки: ${error.message}`);
    },
  });

  const validateFile = (file: File) => {
    if (!file.name.endsWith(".wav") && !file.name.endsWith(".mp3")) {
      throw new Error("Только WAV или MP3");
    }

    const sizeMb = file.size / 1024 / 1024;
    if (sizeMb > MAX_SIZE_MB) {
      throw new Error(`Максимум ${MAX_SIZE_MB}MB`);
    }
  };

  const onFilesSelect = async (fileList: FileList | null) => {
    if (!fileList) return;

    const validFiles: File[] = [];

    for (const file of Array.from(fileList)) {
      try {
        validateFile(file);
        validFiles.push(file);
      } catch (err: any) {
        toast.error(err.message);
      }
    }

    setFiles(validFiles);
  };

  const uploadFiles = async () => {
    if (!files.length) {
      toast.error("Выберите файлы");
      return;
    }

    try {
      setLoading(true);

      // 🔥 UploadThing
      await startUpload(files);

      setFiles([]);
    } catch (err) {
      console.error(err);
      toast.error("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".wav,.mp3"
        hidden
        onChange={(e) => onFilesSelect(e.target.files)}
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          variant="secondary"
          className="w-full sm:w-auto"
          onClick={() => inputRef.current?.click()}
        >
          Выбрать файлы
        </Button>

        <Button
          className="w-full sm:w-auto"
          onClick={uploadFiles}
          disabled={loading}
        >
          {loading ? "Загружаем..." : "Загрузить"}
        </Button>
      </div>

      {files.length > 0 && (
        <ul className="text-sm text-gray-600 list-disc pl-5">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};