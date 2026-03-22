"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui";
import { uploadCover } from "@/app/actions/index";
import { Plus } from "lucide-react";
import { useReleaseStore } from "@/shared/store/release-store";
import { useUploadThing } from "@/shared/lib/uploadthing";

export const ReleaseCoverUpload = ({ releaseId }: { releaseId: string }) => {
  const coverUrl = useReleaseStore((s) => s.release.cover);
  const setRelease = useReleaseStore((s) => s.setRelease);
  const release = useReleaseStore((s) => s.release);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      try {
        const url = res?.[0]?.serverData?.url;

        if (!url) throw new Error("Нет URL");

        await uploadCover(releaseId, url, 0, "image/jpeg");

        setRelease({
          ...release,
          cover: url,
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleCoverUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.src = objectUrl;

    img.onload = async () => {
      if (img.width !== 1024 || img.height !== 1024) {
        setIsModalOpen(true);
        URL.revokeObjectURL(objectUrl);
        return;
      }

      try {
        await startUpload([file]);
      } catch (error) {
        console.error("Ошибка загрузки обложки:", error);
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    };
  };

  return (
    <div className="space-y-4 flex flex-col items-center md:items-start">
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        id="cover-upload"
        className="hidden"
        onChange={handleCoverUpload}
      />

      <label
        htmlFor="cover-upload"
        className="cursor-pointer w-full max-w-[200px] aspect-square rounded-2xl border bg-gray-50 flex flex-col items-center justify-center text-center px-4 sm:px-6 hover:bg-gray-100 transition"
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt="Cover Preview"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <>
            <h2 className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Загрузите обложку
            </h2>

            <div className="rounded-xl bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl mt-4">
              <Plus />
            </div>
          </>
        )}
      </label>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Упс 😅</AlertDialogTitle>
            <AlertDialogDescription>
              Обложка должна быть квадратной!
              <br />
              Размер изображения: <b>1024×1024</b> пикселей
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsModalOpen(false)}>
              Ок, загружу другой файл
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};