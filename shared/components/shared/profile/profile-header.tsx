"use client";

import { User } from "@prisma/client";
import { Button } from "@/shared/components/ui";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";

interface Props {
  user: User;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const ProfileHeader = ({ user, isEditing, setIsEditing }: Props) => {
  const router = useRouter();

  return (
    <div className="rounded-3xl bg-white shadow-sm p-4 flex justify-between items-center">
      
      <div className="flex items-center gap-4">
        
        <div className="relative w-20 h-20 rounded-xl overflow-hidden border">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              {user.fullName[0]}
            </div>
          )}
        </div>

        {isEditing && (
          <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const url = res[0].url;

              fetch("/api/users/avatar", {
                method: "PATCH",
                body: JSON.stringify({ avatarUrl: url }),
              });

              toast.success("Аватар обновлён ✅");
              router.refresh();
            }}
            onUploadError={() => {
              toast.error("Ошибка загрузки ❌");
            }}
          />
        )}

        <div>
          <h2 className="text-xl font-bold">{user.fullName}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      {!isEditing ? (
        <Button onClick={() => setIsEditing(true)}>
          Редактировать
        </Button>
      ) : (
        <Button variant="secondary" onClick={() => setIsEditing(false)}>
          Отмена
        </Button>
      )}
    </div>
  );
};