// 🔥 ДОБАВИЛИ helper для UploadThing

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// 🔥 создаём типизированные хуки
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();