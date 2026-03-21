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
import { useReleaseStore } from "@/shared/store/release-store";
import { Plus } from "lucide-react";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";

export const ReleaseCoverUpload = ({ releaseId }: { releaseId: string }) => {
  const coverUrl = useReleaseStore((s) => s.release.cover);
  const setRelease = useReleaseStore((s) => s.setRelease);
  const release = useReleaseStore((s) => s.release);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="space-y-4 flex flex-col items-center md:items-start">
      
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"

        onClientUploadComplete={async (res) => {
          const url = res[0].url;

          await uploadCover(releaseId, url, 0, "image/jpeg");

          setRelease({
            ...release,
            cover: url,
          });
        }}

        onUploadError={(error) => {
          console.error(error);
        }}
      />

      <div
        className="
          w-full max-w-[200px] 
          aspect-square 
          rounded-2xl border bg-gray-50 
          flex flex-col items-center justify-center text-center 
          px-4 sm:px-6 
        "
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
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Упс 😅</AlertDialogTitle>
            <AlertDialogDescription>
              Обложка должна быть квадратной!
              <br />
              Размер изображения: <b>1024×1024</b>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsModalOpen(false)}>
              Ок
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};