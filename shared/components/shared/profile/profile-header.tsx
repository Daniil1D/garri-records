"use client";

import React, { useRef } from "react";
import { User } from "@prisma/client";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const ProfileHeader = ({ user, isEditing, setIsEditing }: Props) => {
  const router = useRouter();

  const fileRef = useRef<HTMLInputElement>(null);

  const onClickAvatar = () => {
    if (!isEditing) return;
    fileRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Загружаем аватар...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("/api/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Аватар обновлён ✅", { id: toastId });

      router.refresh();
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      toast.error("Ошибка загрузки ❌", { id: toastId });
    }
  };

  return (
    <div className="rounded-3xl bg-white shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      
      <div className="flex items-center gap-4 sm:gap-6">
        <div
          onClick={onClickAvatar}
          className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden border cursor-pointer group ${
            !isEditing && "cursor-default"
          }`}
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg sm:text-xl font-bold">
              {user.fullName[0]}
            </div>
          )}

          {isEditing && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs sm:text-sm font-medium">
              Изменить
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={onFileChange}
        />

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            {user.fullName}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm break-all">
            {user.email}
          </p>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="w-full sm:w-auto rounded-2xl px-6"
          >
            Редактировать
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => setIsEditing(false)}
            className="w-full sm:w-auto rounded-2xl px-6"
          >
            Отмена редактирования
          </Button>
        )}
      </div>
    </div>
  );
};